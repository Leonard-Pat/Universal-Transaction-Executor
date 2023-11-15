import React from 'react';
import Image from 'next/image';
import ConnectWalletButton from '@/components/ConnectWalletButton';

function Banner() {
	return (
		<nav className="z-100 absolute min-w-full bg-black">
			<div className="mx-auto flex max-w-screen-2xl items-center justify-between p-4 pb-1">
				<a className="flex items-center">
					<Image src="/anvil.png" width={75} height={75} alt="logo" className="pr-2"></Image>
					<span className="font-600 hidden self-center whitespace-nowrap font-turret-road text-3xl font-bold dark:text-white md:inline">
						<span className="bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text text-transparent">
							U
						</span>
						niversal{' '}
						<span className="bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text text-transparent">
							T
						</span>
						ransaction{' '}
						<span className="bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text text-transparent">
							E
						</span>
						xecutor
					</span>
					<span className="font-600 inline self-center  whitespace-nowrap bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text font-turret-road text-2xl font-semibold text-transparent md:hidden">
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
