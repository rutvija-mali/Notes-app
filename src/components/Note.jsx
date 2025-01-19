import React from 'react'
import style from '../styles/note.module.css'

const Note = ({note}) => {
  return (
    <div className={style.noteContainer}>
        <div className={style.textContainer}>
           {note.message}
        </div>
        <div className={style.dataContainer}>
             <span>{note.date}  &#8226; {note.time}</span>
             
        </div>
    </div>
  )
}

export default Note