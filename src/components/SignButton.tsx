'use client';

import { FC, useState } from 'react';
import { useWalletStore } from '@/state/wallet';
import toast, { Toaster } from 'react-hot-toast';
import { AccountInterface, num, typedData } from 'starknet';
import { FaFileSignature } from 'react-icons/fa6';
import { SignatureModal } from './SignatureModal';

interface SignProps {
	userTypedData: typedData.TypedData | undefined;
}

export const SignButton: FC<SignProps> = ({ userTypedData }) => {
	const { connect, account } = useWalletStore();
	const [isOpen, setIsOpen] = useState(false);
	const [signature, setSignature] = useState<string[]>(['', '']);
	const [msgHash, setMsgHash] = useState<string>('');

	const connected = Boolean(account);

	const handleSign = async () => {
		try {
			if (userTypedData === undefined) {
				toast.error('Message empty');
				return;
			}
			const userAccount: AccountInterface = account;
			const messageHash = typedData.getMessageHash(userTypedData, account.address);

			await userAccount.signMessage(userTypedData).then((sig) => {
				toast.success('Messaged Signed!');
				const sigArray = sig as string[];
				const sigHexArray = sigArray.map((s) => num.toHex(s));
				setSignature(sigHexArray);
				setMsgHash(messageHash);
				navigator.clipboard.writeText(sigHexArray.join(' '));
				setTimeout(() => {
					setIsOpen(true);
				}, 1000);
			});
		} catch (e) {
			toast.error('Incorrect Message Format');
		}
	};

	const handleClick = async () => {
		if (!connected) {
			await connect();
			toast.success('You are now connected!');
			return;
		}
		handleSign();
	};

	return (
		<div className="mt-12 sm:mt-10">
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-base font-bold text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-800 group-hover:from-pink-500 group-hover:to-orange-400"
				onClick={handleClick}
			>
				<span className=" relative rounded-md bg-gray-900 px-3 py-2 text-xs text-white transition-all duration-75 ease-in group-hover:bg-opacity-0 sm:px-5 sm:py-2.5 md:text-base">
					Sign Message
				</span>
				<span className="ml-1">
					<FaFileSignature size={25} />
				</span>
			</button>
			<SignatureModal
				signature={signature}
				msgHash={msgHash}
				isOpen={isOpen}
				setOpenState={setIsOpen}
			/>
		</div>
	);
};
