import "./App.css";

import Dashboard from "./components/dashboard";
import Nav from "./components/nav";

import Users from "./components/users";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

function App() {
  return (
    <>
      <KindeProvider
        clientId="2c7677556b5a44a3a505c11ed12ec8bf"
        domain="https://helpdesk.kinde.com"
        redirectUri="http://localhost:5173"
        logoutUri="http://localhost:5173"
      >
        <Nav />
        
        <Dashboard />
        <Users />
      </KindeProvider>
    </>
  );
}

export default App;
