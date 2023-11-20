'use client';

import { useWalletStore } from '@/state/wallet';
import { formatChainId } from '@/services/FormatChainId';

function ChainViewer() {
	const { account } = useWalletStore();
	const connected = Boolean(account);

	return !connected ? (
		<></>
	) : (
		<div className=" group relative mr-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-1 focus:ring-pink-800">
			<span className="relative rounded-md bg-gray-900 px-4 py-2.5 text-white transition-all duration-75 ease-in ">
				{formatChainId(account?.provider.chainId)}
			</span>
		</div>
	);
}

export default ChainViewer;
