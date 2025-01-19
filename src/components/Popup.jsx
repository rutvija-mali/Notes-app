import { useState } from "react";
import style from "../styles/popup.module.css"
const Popup = ({group,setGroup, modelRef}) => {
  const[groupName, setGroupName] =useState("");
  const[selectColor, setSelectColor]= useState("")
    const  handleSubmit=(e)=>{

      e.preventDefault();
      if(group != null && group.some((item)=>item.groupName === groupName)){
        alert("This group already exist")
        return
      }
       const newGroup = {groupName,color:selectColor}
        const extraGroup = [...(group||[]),newGroup];
         localStorage.setItem("groups", JSON.stringify(extraGroup))

         setGroup([...(group||[]),{groupName,color: selectColor}])
       
     
    }
  

  
  const preDefinedColors = ["#B38BFA","#FF79F2","#43E6FC","#F19576","#0047FF","#6691FF"];
  
  return (
  
    <div className={style.model} ref={modelRef}>
       
       <form action="" onSubmit={handleSubmit} className={style.groupForm}>
        <h3>Create New group</h3>
        <div className={style.inputs}>
            <label htmlFor="groupName">
              Group name
              <input type="text" id="groupName" placeholder="Enter group name" className={style.groupName}onChange={(e)=>setGroupName(e.target.value)}/>
            </label>
            <label htmlFor="chooseColor" className={style.colorInput}>
              Choose color
              <div className={style.chooseColor}>
                  {preDefinedColors.map((color,index)=>(
                      
                    <div className={`${style.color} ${selectColor === color ? style.selected : ''}`}
                    style={{backgroundColor:color}} key={index}
                    onClick={()=>setSelectColor(color)}
                    >
                      
                    </div>
                  ))}
              </div>
            </label>
          </div>
          <button type="submit">Create</button>
       </form>
    </div>
  )
}

export default Popup