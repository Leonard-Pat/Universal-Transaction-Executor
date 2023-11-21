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
					className="group relative mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-800 group-hover:from-pink-500 group-hover:to-orange-400"
					onClick={async () => {
						await connect().then(() => {
							toast.success('Connected to wallet!');
						});
					}}
				>
					<span className="bg-gray-90 relative rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
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
				className="inline-flex group-hover:to-orange-400text-white group relative mr-4  items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-800 group-hover:from-pink-500"
				onClick={disconnect}
			>
				<span className="hidden md:inline-flex relative rounded-md bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-white transition-all duration-75 ease-in">
					{formatAddress(account?.address)}
				</span>

				<span className="inline-flex md:hidden relative rounded-md bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-white transition-all duration-75 ease-in">
					{formatAddress(account?.address, 3)}
				</span>
			</button>

			<button
				type="button"
				onClick={() => {
					disconnect();
					toast.success('Disconnected from wallet!');
				}}
				className="hidden me-2 md:flex items-center :gap-[3px] rounded-lg bg-red-700 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 "
			>
				<AiOutlineDisconnect />
			</button>
		</>
	);
}

export default ConnectWalletButton;
