import Auth from "@/modules/auth/Auth";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AuthPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "store/reset" });
  }, [dispatch]);

  return <Auth />;
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage);
