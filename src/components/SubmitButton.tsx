'use client';

import { FC } from 'react';
import { useWalletStore } from '@/state/wallet';
import toast, { Toaster } from 'react-hot-toast';
import { AccountInterface, AllowArray, Call } from 'starknet';
import { IoIosColorWand } from 'react-icons/io';

interface SubmitProps {
	calls: AllowArray<Call> | undefined;
}

export const SubmitButton: FC<SubmitProps> = ({ calls }) => {
	const { connect, account } = useWalletStore();
	const connected = Boolean(account);

	const handleExecute = async () => {
		try {
			if (calls === undefined) {
				toast.error('Calls empty');
				return;
			}
			const userAccount: AccountInterface = account;
			let { transaction_hash } = await userAccount.execute(calls);
			userAccount.waitForTransaction(transaction_hash).then(() => {
				toast.success('Transaction executed!');
			});
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
		handleExecute();
	};

	return (
		<div className="mt-10 self-center">
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 pl-2 text-base font-bold text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
				onClick={handleClick}
			>
				<span className="mr-2">
					<IoIosColorWand size={30} />
				</span>

				<span className="relative rounded-md bg-white px-10 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
					Execute Transaction
				</span>
			</button>
		</div>
	);
};
