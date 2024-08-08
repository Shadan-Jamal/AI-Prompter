import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import { AnimatePresence, easeInOut, motion, spring, useMotionValue } from 'framer-motion';
import Navbar from "./components/Navbar";
import CardOne from './components/CardOne';
import CardTwo from "./components/CardTwo";
import SinglePrompts from './components/SinglePrompts';
// import StreamPrompt from './components/StreamPrompt';
import Cursor from './components/Cursor';
import ChatPrompt from './components/ChatPrompt';

function App() {
  const [cursorSize,setCursorSize] = useState({w : 'w-5', h : 'h-5'});
  const [showCard,setShowCard] = useState({cardOne : false , cardTwo : false});
  const [cardsAppear, makeCardsAppear] = useState(false);
  const [color,changeColor] = useState('gray');
  

  console.log(showCard);
  return (
    <>
    <Navbar />
    <Cursor cursorSize={cursorSize} setCursorSize={setCursorSize}/>
    <div className='grid grid-cols-2 grid-flow-row place-content-center place-items-center gap-10 w-full h-screen px-10'>

      {!cardsAppear && 
      <AnimatePresence>
      <motion.div
      style={{backgroundColor: `${color}`}}
      initial = {{scale : 0}}
      animate={{scale : 1}}
      exit={{scale : 0}}
      transition={{delay : 0.2, ease: 'easeInOut' , type: spring}}
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

      {cardsAppear && 
      <motion.div
      initial={{x : 100}}
      animate={{x : 0}}
      transition={{delay :0.4 , type : spring , ease : 'easeInOut'}}
      className='col-span-1 w-[500px] h-[300px] overflow-hidden'
      >
        <CardOne setCursorSize={setCursorSize} setShowCard={setShowCard}/>  
      </motion.div>}

      {cardsAppear && <motion.div>
        <CardTwo setCursorSize={setCursorSize} setShowCard={setShowCard}/>
      </motion.div>}

      {cardsAppear && <motion.div
      onMouseEnter={() => setCursorSize({w : 'w-24' , h : 'h-24'})}
      onMouseLeave={() => setCursorSize({ w : 'w-5', h: 'h-5'})}  
      className='col-span-2 h-[50px]'>
        <Font family='DM Serif Display' weight={800}>
          <motion.p
          // transition={{type:"tween"}}
          className='text-7xl tracking-tight capitalize text-center text-white'>Choose an option
          </motion.p>
        </Font>
      </motion.div>}
      <div className='border border-zinc-600 col-span-2 w-full mt-8'></div>
    </div>
    <div>
      {showCard.cardOne && <SinglePrompts setShowCard={setShowCard}/>}
      {showCard.cardTwo && <ChatPrompt setShowCard={setShowCard}/>}
      {/* {showCard.cardTwo && <StreamPrompt />} */}
    </div>
    </>
  )
}

export default App