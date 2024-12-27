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
      <DialogContent className='bg-[#ececec] p-1.5 rounded-xl overflow-hidden'>
        <div className='bg-white rounded-xl p-3  overflow-hidden'>
      <AnimatePresence>
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
