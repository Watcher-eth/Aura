import React from 'react';
import {
  Dialog,
  DialogContent,

  DialogTrigger
} from "./ui/dialog"
import { AnimatePresence, motion } from "framer-motion"

interface ReusableDialogProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({ trigger, children }) => {
  return (
    <Dialog >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className='bg-[#ababab]/[15%] backdrop-blur-2xl p-2  rounded-[1.5rem] border-[0.1rem] border-[#ababab]  overflow-hidden'>
        <div className='bg-white rounded-[1.5rem] p-5 border-2 border-[#dedede]  overflow-hidden'>
      <AnimatePresence >
      <motion.div
  layout
  className=' overflow-hidden rounded-xl'
>
        {children}</motion.div></AnimatePresence></div>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
