import Nweet from "components/Nweet";
import { authService, dbService } from "fBase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Profile = ({userObj}) => {
    const history = useHistory();
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
    return (
    <>
    <button onClick={onLogOutClick}>Log Out</button>
    </>
    );
}

export default Profile