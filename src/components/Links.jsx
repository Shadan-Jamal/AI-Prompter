import React, { useState } from 'react';
import { motion} from 'framer-motion';
import { MdInsertLink } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Links() {
  const [openLinks , setOpenLinks] = useState(false); 
  return (
    <div 
    className='absolute bottom-5 right-5 -z-50 h-auto rounded p-4 flex flex-col justify-center items-center gap-3 mix-blend-difference'>
        {openLinks && <>
            <motion.div
            initial={{y : 70}}
            animate={{y : 0}}
            transition={{type:'spring' , duration : 0.2}}
            className='rounded-full bg-slate-900 text-xl'
            >
                <a href="https://github.com/Shadan-Jamal">
                    <FaGithub color='white'/>
                </a>
            </motion.div>

            <motion.div
            initial={{y : 30}}
            animate={{y : 0}}
            transition={{type : 'spring'}}
            className='rounded-full bg-slate-900 text-xl'
            >   
                <a href="https://www.instagram.com/bca_coffee_waale/">
                    <FaInstagram color='white'/>
                </a>
            </motion.div>

            <motion.div
            initial={{y : 20}}
            animate={{y : 0}}
            transition={{type : 'spring'}}
            className='rounded-full bg-slate-900'
            >
                <a href="https://www.linkedin.com/in/shadan-jamal-99696824b/">
                    <FaLinkedin color='white' className='text-xl'/>
                </a>
            </motion.div>
        </>
        }
        <motion.div
        onClick={() => setOpenLinks(!openLinks)}
        className='rounded-full'
        >
            <MdInsertLink 
            color='white'
            className='text-xl'
            />
        </motion.div>
    </div>
  )
}

export default Links