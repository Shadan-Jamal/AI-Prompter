import React from 'react';
import Font from "react-font";
import { motion } from 'framer-motion';
import { BsBoxArrowUpRight } from "react-icons/bs";

function CardOne({setCursorSize,setShowCard,setPromptAppear}) {
  const handleClick = () =>{
    setPromptAppear(true);
    setShowCard((prev) => {
      return {...prev,cardOne:true}
    })
  }
  
  return (
    <motion.div
    initial={{x : 500}}
    animate={{x : 0}}
    transition={{delay :0.1 , type : 'spring' , ease : 'linear'}}
    onMouseEnter={() => setCursorSize({w : "w-12", h : "h-12"})}
    onMouseLeave={() => setCursorSize({w : "w-5", h : "h-5"})}
    className='max-w-[90%] h-full px-4 lg:px-7 py-1 lg:py-5 bg-zinc-200/10 rounded-3xl hover:cursor-none flex flex-col justify-evenly'>
        <div className='text-white w-full'>
          <Font family='Prata' weight={400}>
            <h3 className='text-2xl lg:text-3xl mb-3'>Single Prompts</h3>
          </Font>
          <div className='w-full h-[0.2px] bg-white/95'></div>
        </div>
        <div className='w-full'>
        <Font family='Prata' weight={400}>
            <h3 className='text-white text-wrap text-xs lg:text-base'>Use this bot to engage in isolated prompts along with instructions to specify the bot's behaviour.
            </h3>
        </Font>
        </div>
        <div className='w-full h-[0.2px] bg-white/95'></div>
        <div className='w-full px-3'>
          <motion.button
          onClick={handleClick} 
          className='text-white text-base lg:text-xl' 
          >
              <BsBoxArrowUpRight />
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

export default CardOne