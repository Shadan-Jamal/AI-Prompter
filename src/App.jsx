import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import { AnimatePresence, easeInOut, motion, spring, useMotionValue } from 'framer-motion';
import Navbar from "./components/Navbar";
import CardOne from './components/CardOne';
import CardTwo from "./components/CardTwo";
import SinglePrompts from './components/SinglePrompts';
import Cursor from './components/Cursor';
import ChatPrompt from './components/ChatPrompt';
// import StreamPrompt from './components/StreamPrompt';

function App() {
  const [cursorSize,setCursorSize] = useState({w : 'w-5', h : 'h-5'});
  const [showCard,setShowCard] = useState({cardOne : false , cardTwo : false});
  const [cardsAppear, makeCardsAppear] = useState(false);
  const [color,changeColor] = useState('gray');
  const [promptAppear , setPromptAppear] = useState(false);
  const windowWidth = window.innerWidth;
  

  return (
    <>
    <Navbar />
    {windowWidth>1000 && <Cursor cursorSize={cursorSize} setCursorSize={setCursorSize}/>}

    {promptAppear == false && <div className='grid grid-cols-2 place-content-center place-items-center gap-7 lg:gap-10 w-dvw h-dvh px-10 overflow-x-hidden'>

      {!cardsAppear && 
      <AnimatePresence>
      <motion.div
      style={{backgroundColor: `${color}`}}
      initial = {{scale : 0}}
      animate={{scale : 1}}
      exit={{scale : 0}}
      transition={{delay : 0.1, ease: 'easeInOut' , type: spring}}
      className='rounded-full p-5 col-span-2 transition-colors'
      onHoverStart={() => changeColor('black')}
      onHoverEnd={() => changeColor('white')}
      onClick={() => makeCardsAppear(true)}
      >
        <Font family='Oswald' weight={500}>
          <h1 className={`${color === "black" ? 'text-white' : 'text-black'} text-xl tracking-wide`}>
          Click Here
          </h1>
        </Font>
      </motion.div>
      </AnimatePresence>}

      
    {cardsAppear && <motion.div
    className='col-span-2 md:col-span-1 w-full h-[240px] lg:h-[300px] overflow-hidden'
    >
      <CardOne setCursorSize={setCursorSize} setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>  
    </motion.div>}

    {cardsAppear && <motion.div
    className='col-span-2 md:col-span-1 h-[240px] lg:h-[300px] overflow-hidden'
    >
      <CardTwo setCursorSize={setCursorSize} setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>
    </motion.div>}

      {cardsAppear && <motion.div
      onMouseEnter={() => setCursorSize({w : 'w-24' , h : 'h-24'})}
      onMouseLeave={() => setCursorSize({ w : 'w-5', h: 'h-5'})}  
      className='col-span-2 h-fit'>
        <Font family='DM Serif Display' weight={800}>
          <motion.p
          // transition={{type:"tween"}}
          className='text-4xl lg:text-7xl tracking-tight capitalize text-center text-white'>Choose an option
          </motion.p>
        </Font>
      </motion.div>}
      {cardsAppear && <div className='border border-zinc-600 col-span-2 w-full lg:mt-8'></div>}
    </div>}
        
    {promptAppear && <div>
      {showCard.cardOne && <SinglePrompts setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>}
      {showCard.cardTwo && <ChatPrompt setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>}
      {/* {showCard.cardTwo && <StreamPrompt />} */}
    </div>}
    </>
  )
}

export default App