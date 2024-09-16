import React, { useState } from 'react';
import Font from 'react-font';
import { AnimatePresence, delay, motion, spring } from 'framer-motion';
import Navbar from "./components/Navbar";
import CardOne from './components/CardOne';
import CardTwo from "./components/CardTwo";
import SinglePrompts from './components/SinglePrompts';
import Cursor from './components/Cursor';
import ChatPrompt from './components/ChatPrompt';
import Links from './components/Links';

function App() {
  const [cursorSize,setCursorSize] = useState({w : 'w-5', h : 'h-5'});
  const [showCard,setShowCard] = useState({cardOne : false , cardTwo : false});
  const [cardsAppear, makeCardsAppear] = useState(false);
  const [color,changeColor] = useState('gray');
  const [promptAppear , setPromptAppear] = useState(false);
  const [hover,setHover] = useState(false); 

  return (
    <>
    <Navbar />
    {window.innerWidth>1000 && <Cursor cursorSize={cursorSize} setCursorSize={setCursorSize}/>}

    {promptAppear == false && <div className='grid grid-cols-2 place-content-center place-items-center gap-10 px-10 pt-10 lg:gap-10 h-screen'>

      {!cardsAppear && 
      <AnimatePresence>
      <motion.div
      style={{backgroundColor: `${color}`}}
      initial = {{scale : 0}}
      animate={{scale : 1}}
      exit={{scale : 0}}
      transition={{delay : 0.1, ease: 'easeInOut' , type: spring}}
      className='rounded-full px-4 py-2 col-span-2 transition-colors'
      onHoverStart={() => changeColor('black')}
      onHoverEnd={() => changeColor('white')}
      onClick={() => makeCardsAppear(true)}
      >
        <Font family='Oswald' weight={500}>
          <h1 className={`${color === "black" ? 'text-white' : 'text-black'} text-xl tracking-wide`}>
          Click
          </h1>
        </Font>
      </motion.div>
      </AnimatePresence>}

      
    {cardsAppear && <motion.div
    className='col-span-2 md:col-span-1 w-full h-[180px] lg:h-[300px] overflow-hidden'
    >
      <CardOne setCursorSize={setCursorSize} setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>  
    </motion.div>}

    {cardsAppear && <motion.div
    className='col-span-2 md:col-span-1 h-[200px] lg:h-[300px] overflow-hidden'
    >
      <CardTwo setCursorSize={setCursorSize} setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>
    </motion.div>}

      {cardsAppear && <motion.div
      onMouseEnter={() => setCursorSize({w : 'w-24' , h : 'h-24'})}
      onMouseLeave={() => setCursorSize({ w : 'w-5', h: 'h-5'})}  
      className='col-span-2 h-fit lg:w-[60vw] relative'>
        {hover && <motion.p
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl capitalize text-center mix-blend-difference playwrite-es-deco-textfont'
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        transition={{delay : 0.5 , ease : 'easeInOut'}}
        >
          Made by Shadan Jamal
        </motion.p>}
        <motion.div
        animate={{transform : 'translateX(57vw)', width: ['5px','30px','5px']}}
        transition={{ease : 'linear' , repeat : Infinity, repeatType : 'reverse' , duration : 2 }}
        className='absolute w-2 h-full bg-white rotate-12 mix-blend-difference'
        ></motion.div>
        <Font family='DM Serif Display' weight={800}>
          <motion.div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className='flex flex-row gap-3 cursor-default mix-blend-difference justify-center'
          >
          {
            window.innerWidth < 500 ? 
            <motion.p
            className='text-4xl lg:text-7xl tracking-wide md:tracking-tight capitalize text-center text-white'>Make your choice.
            </motion.p> :
            ['M','a','k','e','y','o','u','r','c','h','o','i','c','e'].map((alphabet,index) => {
              return <motion.p
              initial={{transform : 'translateY(0px)'}}
              animate={{transform: `translateY(${hover ? '80px' : '0px'})`}}
              transition={{ease : 'linear' , type : 'spring'}}
              key={index}
              className={`text-base sm:text-4xl md:text-5xl lg:text-7xl tracking-wide md:tracking-tight capitalize text-center text-white mix-blend-difference`}>{alphabet}</motion.p>
            })
          }
          </motion.div>
        </Font>
      </motion.div>}
      {cardsAppear && <div className='border border-zinc-600 col-span-2 w-full lg:mt-8'></div>}
    </div>}
        
    {promptAppear && <div>
      {showCard.cardOne && <SinglePrompts setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>}
      {showCard.cardTwo && <ChatPrompt setShowCard={setShowCard} setPromptAppear={setPromptAppear}/>}
    </div>}

    <Links />
    </>
  )
}

export default App