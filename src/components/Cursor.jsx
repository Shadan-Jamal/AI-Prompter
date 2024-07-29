import React,{useEffect} from 'react'
import { motion } from 'framer-motion'
function Cursor({cursorSize,setCursorSize}) {
  
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      document.getElementById('mouse-move').style.transform=`translate(${e.clientX}px,${e.clientY}px)`
    })
    
    return () => {
      window.removeEventListener("mousemove", (e) => {
        document.getElementById('mouse-move').style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
      })
    };
  },[])

  return (
    <motion.div
    transition={{type:"spring"}}
    id='mouse-move'
    className={`${cursorSize.w} ${cursorSize.h}  absolute -top-3 -left-3 bg-white rounded-full mix-blend-difference pointer-events-none motion-safe:transition-[width,height] ease-in-out`}>
    </motion.div>
  )
}

export default Cursor