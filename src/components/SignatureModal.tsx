'use client';

import { FC } from 'react';
import { FaPaste } from "react-icons/fa6";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  
interface ModalProps{
	signature: string[];
    isOpen: boolean;
    setOpenState: (isOpen: boolean) => void;
}

export const SignatureModal: FC<ModalProps> = ({ signature, isOpen, setOpenState }) => {

	return (

			<AlertDialog open={isOpen}>
  <AlertDialogContent >
    <AlertDialogHeader  >
      <AlertDialogTitle>The signature has been copied to your clipboard!</AlertDialogTitle>
      <AlertDialogDescription className='text-justify'>
You have successfully signed the message and the corresponding signature R and S values have been copied to your clipboard. 
You can also see them below. <br/> Please note once you close this window, the signature will be lost.
      </AlertDialogDescription>
      <div className='border-2 border-solid border-red-500 flex flex-row justify-between items-center'>
        <p>
        Signature R: { signature[0].substring(0, 10)}...{signature[0].substring(signature[0].length - 10) }
        </p>
        <FaPaste size={25} className='mr-2'/>
        
        </div>
      <div className='border-2 border-solid border-red-500 flex flex-row justify-between items-center'>
        <p>
        Signature S: { signature[1].substring(0, 10)}...{signature[1].substring(signature[1].length - 10) }
            </p>
            <FaPaste size={25} className='mr-2'/>
        </div>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={() => setOpenState(false)}>Done</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
	);
};
