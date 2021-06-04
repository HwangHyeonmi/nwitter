import Nweet from "components/Nweet";
import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Profile = ({userObj,refreshUser}) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
        
    }

    const getMyNweets = async() =>{
        //누구인지 알려줘야 프로필 얻을 수 있음.
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs.map(doc =>doc.data()));
    }
    useEffect(()=>{
        getMyNweets();
    },[])
    
   
    const onChange= (event) =>{
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName:newDisplayName,
            });
            refreshUser();
        }
    }
    

    return (
    <>
    <div className="container">
    <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} 
        type="text" 
        autoFocus
        placeholder="Display name"
        value={newDisplayName
        }
        className="formInput" />
        <input  
        type="submit" 
        value="Update Profile"
        className="formBtn"
          style={{
            marginTop: 10,
          }} />
    </form>
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    </>
    );
}

export default Profile