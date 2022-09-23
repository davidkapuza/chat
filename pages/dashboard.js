import { Button } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase.config'
import Loader from '../src/components/elements/loader/Loader'

function Dashboard() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const signOutHandler = () => {
    signOut(auth).then(() => {
      router.push("/login")
    })
  }
  if (loading) {
    return (
      <Loader></Loader>
    )
  }
  return (
    <Button onClick={signOutHandler}>Sign Out</Button>
  )
}

export default Dashboard