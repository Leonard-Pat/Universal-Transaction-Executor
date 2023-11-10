import React from 'react';
import Image from 'next/image';
import ConnectWalletButton from '@/components/ConnectWalletButton';

function Banner() {
	return (
		<nav className="z-100 absolute min-w-full bg-black">
			<div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4 pb-1">
				<a className="flex items-center">
					<Image src="/anvil.png" width={75} height={75} alt="logo" className="pr-2"></Image>
					<span className="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:inline">
						Universal Transaction Executor
					</span>
					<span className="inline self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:hidden">
						UTE
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
