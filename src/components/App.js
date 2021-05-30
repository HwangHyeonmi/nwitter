import { useEffect, useState } from "react";
import { Router } from "react-router";
import AppRouter from "components/AppRouter";
import{ authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj ] = useState(null);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
    <>
    {init? <AppRouter userObj={userObj} isLoggedIn={isLoggedIn}></AppRouter> : "Initializing..."}
    <footer>&copy; Twitter {new Date().getFullYear}</footer>
    </>
  );
}

export default App;
