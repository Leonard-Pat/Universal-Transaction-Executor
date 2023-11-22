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
			toast.error('Incorrect Calldata Format');
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
		<div className="mt-12 sm:mt-10">
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 pl-2 text-base font-bold text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-800 group-hover:from-pink-500 group-hover:to-orange-400"
				onClick={handleClick}
			>
				<span className="mr-2">
					<IoIosColorWand size={29} />
				</span>

				<span className="relative rounded-md bg-gray-900 px-3 py-2 sm:px-5 sm:py-2.5 md:px-8 text-xs text-white transition-all duration-75 ease-in group-hover:bg-opacity-0 md:text-base">
					Execute Transaction
				</span>
			</button>
		</div>
	);
};
