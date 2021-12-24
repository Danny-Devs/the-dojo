import { useEffect, useState } from 'react'
import { projectAuth, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath =`thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display name to user
      await res.user.updateProfile({ displayName, photoUrl: imgUrl })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      // update state. the if check works with the cleanup function
      if (!isCanceled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCanceled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true)
  }, [])

  return { error, isPending, signup }
}
