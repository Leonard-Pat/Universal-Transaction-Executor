'use client';

import { FC } from 'react';
import { useWalletStore } from '@/state/wallet';
import toast, { Toaster } from 'react-hot-toast';
import { useContractStore } from '@/state/contract';
import { useCallDataStore } from '@/state/callData';
import { Abi, AccountInterface, CallData } from 'starknet';

export type buttonAction = 'load' | 'execute';

interface SubmitProps {
	action: buttonAction;
	message?: string;
}

export const SubmitButton: FC<SubmitProps> = ({ action, message }) => {
	const { connect, account } = useWalletStore();
	const setContractAddress = useContractStore((state) => state.setContractAddress);
	const setContractAbi = useContractStore((state) => state.setContractAbi);
	const contractAbi = useContractStore((state) => state.contractAbi);
	const contractAddress = useContractStore((state) => state.contractAddress);
	const callData = useCallDataStore((state) => state.callData);
	const connected = Boolean(account);

	const handleLoad = async () => {
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
				let data = await response.json();
				setContractAbi(data.abi);
				setContractAddress(message as string, '1');
			}
			toast.remove();
			toast.success('Contract Loaded!');
		} catch (e) {
			toast.remove();
			toast.error('Error loading contract');
		}
	};

	const handleExecute = async () => {
		try {
			if (contractAddress === '') {
				toast.error('No contract address found');
				return;
			}
			if (Object.keys(callData).length === 0) {
				toast.error('No call data found');
				return;
			}
			const entrypoint = message as string;
			if (entrypoint === undefined) {
				toast.error('No entry point found');
				return;
			}
			const userAccount: AccountInterface = account;

			console.log(entrypoint);
			const cd = new CallData(contractAbi as Abi).compile(entrypoint, callData);
			const calls = [
				{
					contractAddress: contractAddress,
					entrypoint: entrypoint,
					calldata: cd,
				},
			];
			await userAccount.execute(calls);
		} catch (e) {
			console.log(e);
		}
	};

	const handleClick = async () => {
		if (!connected) {
			await connect();
			toast.success('You are now connected!');
			return;
		}
		if (action == 'load') {
			handleLoad();
		} else if (action == 'execute') {
			handleExecute();
		}
	};

	return (
		<div className="mt-10 self-center">
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
				onClick={handleClick}
			>
				<span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
					{action == 'load' ? 'Load Contract' : 'Execute Transaction'}
				</span>
			</button>
		</div>
	);
};
