import { IoSend } from "react-icons/io5";
import style from "../styles/message.module.css"
import { useState } from "react";


const MessageBox = ({handleSendNotes,message,setMessage}) => {
  const handleKeyDown = (e,message) => {
    if (e.key === 'Enter') {
      handleSendNotes(message);
      setMessage("")
    }
  };
     
  return (
    <div className={style.textContainer}>
        <textarea name="notes" id="messageBox"
          placeholder="Enter your text here........."
          rows={4}
          onChange={(e)=>setMessage(e.target.value)}
          value={message}
          onKeyDown={(e)=>handleKeyDown(e,message)} 
        >
         
        </textarea>
        <button className={style.btn} disabled={!message.trim()} 
               style={{color:!message.trim()? "#5C5C5C":"#001F8B" }}
               onClick={()=>handleSendNotes(message) }
        >
          <IoSend size={30}/>
        </button>

    </div>
  )
}

export default MessageBox