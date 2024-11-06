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

        const authHeader = `Basic ${btoa(`${process.env.ZENDESK_USERNAME}:${process.env.ZENESK_API_TOKEN}`)}`;
        const response = await axios.post(
          "http://localhost:5000/api/registerUser",
          {
            user: {
              
              id: user.id,
              family_name: user.family_name,
              given_name: user.given_name,
              email: user.email,
              external_id: "external_user_008", 
              identities: [
                { type: "email", value: user.email },
                
              ],
              organization: { name: "General" }, 
              role: "end-user",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": authHeader,
            },
          }
        );

        console.log("Response from API:", response.data);
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
