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
      <DialogContent className='bg-[#efefef] p-1.5  rounded-[1.5rem] border-2 border-[#ededed]  overflow-hidden'>
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
