'use client';

import { useWalletStore } from '@/state/wallet';
import { formatChainId } from '@/services/FormatChainId';
import { GoDotFill } from 'react-icons/go';
import { IconContext } from 'react-icons';

function ChainViewer() {
	const { account } = useWalletStore();
	const connected = Boolean(account);

	return !connected ? (
		<></>
	) : (
		<div className=" group relative mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-1 focus:ring-pink-800">
			<span className="relative flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2.5 text-white transition-all duration-75 ease-in ">
				<span className="relative flex h-2 w-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
					<span className="relative inline-flex h-2 w-2 rounded-full  bg-green-400"></span>
				</span>
				{formatChainId(account?.provider.chainId)}
			</span>
		</div>
	);
}

export default ChainViewer;
