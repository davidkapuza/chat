import { AuthAction, withAuthUser, useAuthUser } from "next-firebase-auth";
import Auth from "@/modules/auth/Auth";

function AuthPage() {
  const AuthUser = useAuthUser()
  return (
    <Auth user={ AuthUser } />
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage);
