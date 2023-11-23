'use client';

import { FC } from 'react';
import { FaPaste } from 'react-icons/fa6';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Toaster, toast } from 'react-hot-toast';

interface ModalProps {
	signature: string[];
	isOpen: boolean;
	setOpenState: (isOpen: boolean) => void;
}

export const SignatureModal: FC<ModalProps> = ({ signature, isOpen, setOpenState }) => {
	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>The signature has been copied to your clipboard!</AlertDialogTitle>
					<AlertDialogDescription className="text-justify">
						You have successfully signed the message and the corresponding signature R and S values
						have been copied to your clipboard. You can also see them below. <br /> Please note once
						you close this window, the signature will be lost.
					</AlertDialogDescription>
					<div className="flex flex-row items-center justify-between">
						<p>
							<span className="mr-2 text-base font-bold text-slate-600"> Signature S: </span>
							{signature[0].substring(0, 15)}...
							{signature[0].substring(signature[0].length - 15)}
						</p>
						<FaPaste
							size={20}
							className="mr-2 hover:cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(signature[0]);
								toast.success('Successfully copied');
							}}
						/>
					</div>
					<div className="flex flex-row items-center justify-between">
						<p>
							<span className="mr-2 text-base font-bold text-slate-600"> Signature S: </span>
							{signature[1].substring(0, 15)}...
							{signature[1].substring(signature[1].length - 15)}
						</p>
						<FaPaste
							size={20}
							className="mr-2 hover:cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(signature[1]);
								toast.success('Successfully copied');
							}}
						/>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={() => setOpenState(false)}>Done</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
