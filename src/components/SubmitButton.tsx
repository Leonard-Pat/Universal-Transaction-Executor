'use client';

import { FC } from 'react';
import { useWalletStore } from '@/state/wallet';
import toast, { Toaster } from 'react-hot-toast';
import { useContractStore } from '@/state/contract';

export type buttonAction = 'load' | 'execute';

interface SubmitProps {
	action: buttonAction;
	message?: string;
}

export const SubmitButton: FC<SubmitProps> = ({ action, message }) => {
	const { connect, account } = useWalletStore();
	const setContractAddress = useContractStore((state) => state.setContractAddress);
	const connected = Boolean(account);

	const handleLoad = async () => {
		if (!connected) {
			await connect();
			toast.error('Please try loading contract again.');
			return;
		}
		try {
			toast.loading('Loading Contract...');

			const body = {
				baseUrl: account.provider.baseUrl || account.provider.nodeUrl,
				rpc: !account.provider.baseUrl,
			};

			const response = await fetch(`/api/contract/${message}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (response) {
				setContractAddress(message as string, '0');
			}
			toast.remove();
			toast.success('Contract Loaded!');
		} catch (e) {
			toast.remove();
			toast.error('Error loading contract');
		}
	};

	return (
		<div className="mt-10">
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
				onClick={handleLoad}
			>
				<span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
					{action == 'load' ? 'Load Contract' : 'Execute Transaction'}
				</span>
			</button>
		</div>
	);
};
