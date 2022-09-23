import { Center, Spinner } from '@chakra-ui/react'
function Loader() {
  return (
    <Center w="100vw" h="100vh">
      <Spinner size="lg"/>
    </Center>
  )
}

export default Loader
