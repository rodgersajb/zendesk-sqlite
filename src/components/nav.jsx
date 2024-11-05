import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import UserProfile from "./userprofile";

export default function Nav() {
  const { login, register } = useKindeAuth();
  return (
    <nav>
        <h1>Zendesk App</h1>
        <UserProfile />
      <button onClick={register} type="button">
        Register
      </button>
      <button onClick={login} type="button">
        Log In
      </button>
    </nav>
  );
}
