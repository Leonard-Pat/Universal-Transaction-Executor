'use client';

import { FC } from 'react';
import { useWalletStore } from '@/state/wallet';
import toast, { Toaster } from 'react-hot-toast';

export type buttonAction = 'load' | 'execute';

interface SubmitProps {
	action: buttonAction;
}

export const SubmitButton: FC<SubmitProps> = ({ action }) => {
	const { connect, account, disconnect } = useWalletStore();
	const connected = Boolean(account);

	return (
		<div className="mt-10">
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
				onClick={async () => {
					await connect().then(() => {
						toast.success('Connected to wallet!');
					});
				}}
			>
				<span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
					{action == 'load' ? 'Load Contract' : 'Execute Transaction'}
				</span>
			</button>
		</div>
	);
};
