import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import { motion } from 'framer-motion';
import Navbar from "./components/Navbar";
import CardOne from './components/CardOne';
import CardTwo from "./components/CardTwo";
import SinglePrompts from './components/SinglePrompts';

function App() {
  const [cursorSize,setCursorSize] = useState({w : 'w-10', h : 'h-10'});

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
    <>
    <Navbar />

    <motion.div
    transition={{type:"spring"}}
    id='mouse-move'
    className={`${cursorSize.w} ${cursorSize.h} absolute -top-12 -left-12 bg-white rounded-full mix-blend-difference pointer-events-none motion-safe:transition-[width,height] ease-in-out`}>
    </motion.div>

    <div className='grid grid-cols-2 grid-flow-row place-content-center place-items-center gap-10 w-full h-screen px-10'>

      <CardOne cursorSize={cursorSize} setCursorSize={setCursorSize} />  
      <CardTwo cursorSize={cursorSize} setCursorSize={setCursorSize} />

      <motion.div
      onMouseEnter={() => setCursorSize({w : 'w-24' , h : 'h-24'})}
      onMouseLeave={() => setCursorSize({ w : 'w-10', h: 'h-10'})}  
      className='col-span-2 h-[50px] cursor-none'>
        <Font family='DM Serif Display' weight={800}>
          <motion.p
          // transition={{type:"tween"}}
          className='text-7xl tracking-tight capitalize text-center cursor-none text-white'>Choose an option
          </motion.p>
        </Font>
      </motion.div>
      {/* <SinglePrompts /> */}
    </div>
    </>
  )
}

export default App