
import { addUserToDatabase } from "./db/statements";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";


// add new user to local SQLite database
export const userDetails = async () => {
     const {  getUser } = useKindeAuth();
     const user = getUser();
     if (user) {
        addUserToDatabase(user);
        console.log('user added');
     }
    
};