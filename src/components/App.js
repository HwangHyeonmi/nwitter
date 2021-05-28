import { useState } from "react";
import { Router } from "react-router";
import AppRouter from "components/AppRouter";
import{ authService } from "fBase";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
    <footer>&copy; Nwitter {new Date().getFullYear}</footer>
    </>
  );
}

export default App;
