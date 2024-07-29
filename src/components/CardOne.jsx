import React from 'react';
import Font from "react-font";
import { motion } from 'framer-motion';
import { BsBoxArrowUpRight } from "react-icons/bs";

function CardOne({setCursorSize,setShowCard}) {
  return (
    <motion.div
    onMouseEnter={() => setCursorSize({w : "w-12", h : "h-12"})}
    onMouseLeave={() => setCursorSize({w : "w-5", h : "h-5"})}
    initial={{border:"none"}}
    whileHover={{border:"3px solid white"}}
    transition={{
      ease:"ease-in-out"}}
    className='col-span-1 w-[400px] h-[250px] px-7 py-5 bg-zinc-200/10 rounded-3xl hover:cursor-none'>
        <div className='text-white w-full mb-6'>
          <Font family='Prata' weight={400}>
            <h3 className='text-3xl mb-3'>Single Prompts</h3>
          </Font>
          <div className='w-full h-[0.2px] bg-white/95'></div>
        </div>
        <div className='w-full mb-3'>
        <Font family='Prata' weight={400}>
            <h3 className='text-white text-wrap '>Use this bot to engange in isolated prompts along with instructions to specify the bot's behaviour.
            </h3>
        </Font>
        </div>
        <div className='w-full h-[0.2px] bg-white/95'></div>
        <div className='w-full py-6 px-3'>
          <motion.button
          onClick={() => setShowCard((prev) => {
            return {...prev,cardOne:true}
          })} 
          className='text-white text-xl' 
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