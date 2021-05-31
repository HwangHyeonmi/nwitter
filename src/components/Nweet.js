import { dbService, storageService } from "fBase";
import React, { useState } from "react";



const Nweet = ({nweetObj, isOwner}) => {
    const [editing ,setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () =>{
        const ok = window.confirm("Are you sure you want to delete this nweet");
        console.log(ok)
        if(ok){
            //delete nweet
            dbService.doc(`nweets/${nweetObj.id}`).delete();
            storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = (event) =>{
        event.preventDefault();
        console.log(nweetObj, newNweet);
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) =>{
        const {target:{value}} = event;
        setNewNweet(value);
    }
    return (
        <div>
           {editing?
           <> 
           {isOwner && 
           <>
            <form onSubmit={onSubmit}>
               <input 
               onChange={onChange}
               type="text" 
               placeholder="Edit your nweet" 
               value={newNweet} 
               required />
               <input type="submit" value="Update Nweet" />
           </form>
           </>}
           <button onClick={toggleEditing}>Cancel</button>
           </>
           :
           <>
           <h4> {nweetObj.text}</h4>
           {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
           {isOwner&&(
           <>
           <button onClick={onDeleteClick}>Delete tweet</button>
           <button onClick={toggleEditing}>Edit tweet</button>
           </>
            )}  
           </>}             
        </div>
    );
};

export default Nweet;