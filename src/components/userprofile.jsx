import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function UserProfile() {
  const { user, isAuthenticated, isLoading } = useKindeAuth();

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="text-white"> 
          <h2>{user.given_name}{user.family_name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Please sign in or register!</p>
      )}
    </>
  );
}
