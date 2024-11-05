import { addUserToDatabase } from "./db/statements";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

// add new user to local SQLite database
export const userDetails = async () => {
  const { user } = useKindeAuth();

  if (user) {
    addUserToDatabase(user.id, user.family_name, user.given_name, user.email);
    console.log("user added");
  }
};
