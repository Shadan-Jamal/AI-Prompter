import React, { useEffect, useRef, useState } from 'react';
import Font from 'react-font';
import { motion } from 'framer-motion';
import Navbar from "./components/Navbar";
import CardOne from './components/CardOne';
import CardTwo from "./components/CardTwo";
import SinglePrompts from './components/SinglePrompts';

function App() {

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      document.getElementById('mouse-move').style.transform=`translate(${e.clientX}px,${e.clientY}px)`
    })
  },[])

  return (
    <>
    <Navbar />
    
    <div
    id='mouse-move'
    className='absolute -z-50 w-20 h-20 rounded-full bg-white'>
    </div>

    <div className='grid grid-cols-2 grid-flow-row place-content-center place-items-center gap-10 w-full h-screen px-10'>
      <CardOne />  
      <CardTwo />
      <div className='col-span-2 w-3/4 h-[50px] hover:cursor-default'>
        <Font family='DM Serif Display' weight={800}>
          <motion.p 
          className='text-7xl tracking-tight capitalize text-center'>Choose an option
          </motion.p>
        </Font>
      </div>
      {/* <SinglePrompts /> */}
    </div>
    </>
  )
}

export default App