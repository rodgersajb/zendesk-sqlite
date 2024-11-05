import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import UserProfile from "./userprofile";
import axios from "axios";

export default function Nav() {
  const { login, register, isAuthenticated, logout } = useKindeAuth();

  const handleRegister = async () => {
    try {
      // call register function in user variable
      const user = await register();

      // see if user was successfully registered
      if (user) {
        // send to backend
        await axios.post("/api/registerUser", {
          id: user.id,
          email: user.email,
          given_name: user.given_name,
          family_name: user.family_name,
        });
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <nav>
      <h1>Zendesk App</h1>
      <UserProfile />
      {!isAuthenticated ? (
        <>
          <button onClick={handleRegister} type="button">
            Register
          </button>
          <button onClick={login} type="button">
            Log In
          </button>
        </>
      ) : (
        <button onClick={logout} type="button">
          Log Out
        </button>
      )}
    </nav>
  );
}
