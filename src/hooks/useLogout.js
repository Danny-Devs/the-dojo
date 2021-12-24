import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign the user out
    try {
      // .signOut is provided by firebase 'auth' in firebase/config.js
      await projectAuth.signOut()

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      if (!isCanceled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch(err) {
      if (!isCanceled) {
        setError(err.message)
        setIsPending(false)
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true)
  }, [])

  return { logout, error, isPending }
}
