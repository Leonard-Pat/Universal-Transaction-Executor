import React from 'react';
import Image from 'next/image';
import ConnectWalletButton from '@/components/ConnectWalletButton';

function Banner() {
	return (
		<nav className="bg-black">
			<div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
				<a className="flex items-center">
					<Image src="/anvil.png" width={75} height={75} alt="logo" className="pr-2"></Image>
					<span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
						Universal Transaction Executor
					</span>
				</a>
				<div className="flex md:order-2">
					<ConnectWalletButton />
				</div>
			</div>
		</nav>
	);
}

export default Banner;
