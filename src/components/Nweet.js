import { dbService } from "fBase";
import React from "react";



const Nweet = ({nweetObj, isOwner}) => {
    const onDeleteClick = () =>{
        const ok = window.confirm("Are you sure you want to delete this nweet");
        console.log("delete")
        if(ok){
            //delete nweet
            dbService.doc(`nweets/${nweetObj.id}`).delete()
        }
    }
    return (
        <div>
           <h4> {nweetObj.text}</h4>
           {isOwner&&(
           <>
           <button onClick={onDeleteClick}>Delete tweet</button>
           <button>Edit tweet</button>
           </>
            )}               
        </div>
    );
};

export default Nweet;