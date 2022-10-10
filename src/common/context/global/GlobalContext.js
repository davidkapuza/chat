import { useContext } from 'react'
import { AuthAction, useAuthUser, withAuthUser, getFirebaseAdmin } from "next-firebase-auth";

function GlobalContext({children}) {
  const GlobalContext = useContext()
  const user = useAuthUser()
  const db = getFirebaseAdmin().firestore()
  return (
    <GlobalContext.Provider
      value={{user, db}}
    >
      {children}
    </GlobalContext.Provider>

  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(GlobalContext);