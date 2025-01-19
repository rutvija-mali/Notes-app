import style from "../styles/groupList.module.css"

const Group = ({group,handleNote,textColor}) => {
  return (
      <div className={style.list} onClick={()=>handleNote(group)} >
            <div style={{backgroundColor:group.color}}
                className={style.circulerDial}
                >{group.groupName.trim().split(" ")
                                 .slice(0,2).map((word)=>word.charAt(0).toUpperCase())
                                 .join("")}
            </div>
            <p style={{color:textColor}}>{group.groupName}</p>
     
       </div>
  )
}

export default Group