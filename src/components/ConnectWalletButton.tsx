'use client';

import { useWalletStore } from '@/state/wallet';
import { formatAddress } from '@/services/FormatAddress';
import { AiOutlineDisconnect } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

function ConnectWalletButton() {
	const { connect, account, disconnect } = useWalletStore();
	const connected = Boolean(account);

	if (!connected) {
		return (
			<>
				<Toaster position="bottom-right" reverseOrder={false} />
				<button
					className="group relative mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
					onClick={async () => {
						await connect().then(() => {
							toast.success('Connected to wallet!');
						});
					}}
				>
					<span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
						Connect Wallet
					</span>
				</button>
			</>
		);
	}

	return (
		<>
			<Toaster position="bottom-right" reverseOrder={false} />
			<button
				type="button"
				onClick={() => {
					disconnect();
					toast.success('Disconnected from wallet!');
				}}
				className="me-2 flex items-center gap-[3px] rounded-lg bg-red-700 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 "
			>
				<AiOutlineDisconnect />
				Disconnect
			</button>

			<button
				className="group relative mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
				onClick={disconnect}
			>
				<span className="relative rounded-md bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 transition-all duration-75 ease-in">
					{formatAddress(account?.address)}
				</span>
			</button>
		</>
	);
}

export default ConnectWalletButton;
