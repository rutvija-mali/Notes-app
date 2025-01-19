
import { useState,useEffect, useRef } from 'react'
import style from "./styles/home.module.css"
import Popup from './components/Popup'
import GroupList from './components/GroupList';
import image from "./assests/background-img.png"
import lock from "./assests/Vector (5).png"
import Group from './components/Group';
import MessageBox from './components/MessageBox';
import Note from './components/Note';
import { BiArrowBack } from "react-icons/bi"; 


function App() {
  const[model,setModel] = useState()
  const[ group, setGroup] = useState(()=>{
    return JSON.parse(localStorage.getItem("groups")) || [];
  });
  const modelRef = useRef(null);

  const[notes,setNotes] = useState(()=>{
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const[isNotesOpen, setIsNotesOpen] = useState(false)
  const[selectedGroup, setSelectedGroup] = useState({
    groupName :null,
    color:null
  })
  
  const [message , setMessage] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

 const isSmallScreen = window.innerWidth<=768 ;

  useEffect(()=>{
   const  storedGroups =  JSON.parse(localStorage.getItem("groups"));
   setGroup(storedGroups)
},[])

const closeModel=()=>{
  setModel(false);
} 

const handleClickOutside=(e)=>{
 if(modelRef.current && !modelRef.current.contains(e.target)){
   closeModel();
 }

  
}

const handleNote =(group)=>{

  setIsNotesOpen(true)
  console.log(isNotesOpen);
  
  setSelectedGroup({
    groupName:group.groupName,
    color:group.color
  })


}

const handleSendNotes = (message)=>{
  const newNote ={
    message:message,
    groupName:selectedGroup.groupName,
    date:getDate(),
    time:getTime()
  }
  
  const allNotes = [...(notes||[]),newNote]
  localStorage.setItem("notes",JSON.stringify(allNotes))
  setNotes(allNotes);
  setMessage("");
  

}

function getDate(){
 const option = {day:'numeric',month:'long',year:'numeric'}
 const today =  new Date();
 return today.toLocaleString('en-GB',option)
}

function getTime(){
  const today =  new Date();
  const option ={hour:'numeric',minute:'numeric',hour12:true}
  return today.toLocaleString('en-GB',option)
}


useEffect(()=>{
  if(model){
    document.addEventListener("mousedown",handleClickOutside)
  }else{
    document.removeEventListener("mousedown",handleClickOutside)
  }

  return ()=>{ document.removeEventListener("mousedown",handleClickOutside)}
},[model])

useEffect(()=>{
  if(selectedGroup.groupName){
    const filteredNote = notes.filter((note)=>(note.groupName === selectedGroup.groupName))

      setFilteredNotes(filteredNote)

    }
    
  
},[selectedGroup,notes])

  return (
    <div className={`${style.mainContainer}  ${style.modelOverlay}` }>
       {model && <div className={style.overlay}></div>}
     { model && <Popup group={group} setGroup={setGroup} modelRef={modelRef}/> }
     
        <div className={`${style.sidebar} ${isSmallScreen && isNotesOpen? style.hidden:""}`}>
          <GroupList groups={group} setModel={setModel} handleNote={handleNote}/>
        </div>
        {isNotesOpen ? (
           <div className={`${style.notesPage} ${isSmallScreen && isNotesOpen ? style.active:""}`}>
             <div className={style.header} >
                   {isNotesOpen && isSmallScreen ?( <button onClick={()=>{setIsNotesOpen(false)}} className={style.backwardArrow}>
                     <BiArrowBack size={35} />
                    </button>):""}
                   <Group group={selectedGroup} textColor={'#FFFFFF'} />
             </div>
             <div className={style.noteContainer}>
             {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => <Note note={note} key={index}/>) 
              ) : (
                 
                 ""
                
              )}
             </div>
             <div className={style.message}>
                <MessageBox handleSendNotes={handleSendNotes} message={message} setMessage={setMessage}/>
             </div>
           </div>
        ):(
          <div className={style.initialNotesPage} >
            <div>
              <img src={image} alt="image" width="626px"  />
              <h4>Pocket Notes</h4>
              <p>Send and receive messages without keeping your phone online.<span><br /></span>
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <p className={style.encyrptMsg}><span><img src={lock} alt="lock img" /></span>end-to-end encrypted</p>
          </div>
        )}
         
       
     
      
    </div>
  )
}

export default App
