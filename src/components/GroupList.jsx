import style from "../styles/groupList.module.css"
import Group from "./Group"

const GroupList = ({groups,setModel,handleNote}) => {

   
  return (
    <div className={style.groupListContainer}>
        <div className={style.heading}>
          <h1>Pocket Notes</h1>
        </div>
          <div className={style.listContainer}>
            {groups === null ?(
              ""
            ):(
              groups.map((group)=>(
                
                <Group group={group} key={group.groupName} handleNote={handleNote} textColor={'#000000'}/>
            ))
            )}
             <button onClick={()=>setModel(true)}>+</button>
          </div>
       
    </div>
  )
}

export default GroupList