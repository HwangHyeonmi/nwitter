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
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
    {init? <AppRouter refreshUser={refreshUser} userObj={userObj} isLoggedIn={isLoggedIn}></AppRouter> : "Initializing..."}
    
    </>
  );
}

export default App;
