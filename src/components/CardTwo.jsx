import React from 'react';
import Font from "react-font";
import { motion } from 'framer-motion';
import { BsBoxArrowUpRight } from "react-icons/bs";

function CardTwo({setCursorSize,setShowCard,setPromptAppear}) {
  const handleClick = () =>{
    setPromptAppear(true);
    setShowCard((prev) => {
      return {...prev,CardTwo:true}
    })
  }
  return (
    <motion.div
    initial={{x : -500}}
    animate={{x : 0}}
    transition={{delay :0.1 , type : 'spring' , ease : 'linear'}} 
    onMouseEnter={() => setCursorSize({w : "w-12", h : "h-12"})}
    onMouseLeave={() => setCursorSize({w : "w-5", h : "h-5"})}
    className='w-[90%] h-full px-7 pt-7 bg-zinc-300/10 rounded-3xl flex flex-col justify-evenly items-center hover:cursor-none'>
        <div className='text-white w-full mb-6'>
          <Font family='Prata' weight={400}>
            <h3 className='text-3xl mb-3'>Chat Bot</h3>
          </Font>
          <div className='w-full h-[0.2px] bg-white/95'></div>
        </div>
        <div className='w-full mb-3'>
        <Font family='Prata' weight={400}>
            <h3 className='text-white text-wrap '>Use this bot to engange in a chat.</h3>
        </Font>
        </div>
        <div className='w-full h-[0.2px] bg-white/95'></div>
        <div className='w-full py-6 px-3'>
          <motion.button
          onClick={handleClick} 
          className='text-white text-xl' 
          > <BsBoxArrowUpRight />
          </motion.button>
          {/* <motion.button className="text-white text-xl">
            <Font family='Prata' weight={400}>
              <h3 className='text-xl text-white'>Check out the docs.</h3>
            </Font>
          </motion.button> */}
        </div>
      </motion.div>
  )
}

export default CardTwo