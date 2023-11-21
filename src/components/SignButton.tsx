'use client';

import { FC } from 'react';
import { useWalletStore } from '@/state/wallet';
import toast, { Toaster } from 'react-hot-toast';
import { AccountInterface } from 'starknet';
import { FaFileSignature } from 'react-icons/fa6';
import { useSearchParams } from 'next/navigation';

export const SignButton: FC = () => {
	const { connect, account } = useWalletStore();
	const connected = Boolean(account);
	const searchParams = useSearchParams();
	const message = searchParams.get('message');

	const handleSign = async () => {
		const userAccount: AccountInterface = account;
		// const sig = await userAccount.signMessage();
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
				<span className="relative rounded-md bg-gray-900 px-6 py-2.5 text-white transition-all duration-75 ease-in group-hover:bg-opacity-0">
					Sign Message Hash
				</span>
				<span className="ml-1">
					<FaFileSignature size={25} />
				</span>
			</button>
		</div>
	);
};
