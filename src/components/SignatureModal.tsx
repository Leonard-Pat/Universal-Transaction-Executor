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
import { toast } from 'react-hot-toast';

interface ModalProps {
	msgHash: string;
	signature: string[];
	isOpen: boolean;
	setOpenState: (isOpen: boolean) => void;
}

export const SignatureModal: FC<ModalProps> = ({ msgHash, signature, isOpen, setOpenState }) => {
	// setOpenState(true);
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
						<span className="mr-2 text-base font-bold text-slate-600"> Message Hash: </span>
						<p style={{ overflowWrap: 'anywhere' }}>{msgHash}</p>
						<FaPaste
							size={30}
							className="ml-8 hover:cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(msgHash);
								toast.success('Successfully copied');
							}}
						/>
					</div>
					<div className="flex flex-row pt-5">
						<div className="flex flex-col items-center justify-between gap-4">
							<div className="flex">
								<span className="mr-2 text-base font-bold text-slate-600"> Signature R: </span>
								<p style={{ overflowWrap: 'anywhere' }}>{signature[0]}</p>
							</div>
							<div className="flex">
								<span className="mr-2 text-base font-bold text-slate-600"> Signature S: </span>
								<p style={{ overflowWrap: 'anywhere' }}>{signature[1]}</p>
							</div>
						</div>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={() => setOpenState(false)}>Done</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
