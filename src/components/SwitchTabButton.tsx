'use client';

import { FC } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Link from 'next/link';

interface TabProps {
	text: string;
	link: string;
}

export const SwitchTabButton: FC<TabProps> = ({ text, link }) => {
	return (
		<Link href={`/${link}`}>
			<div className="mt-12 sm:mt-10">
				<button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-xs font-bold text-white hover:text-white focus:outline-none focus:ring-1 focus:ring-pink-800 group-hover:from-pink-500 group-hover:to-orange-400 md:text-base">
					<span className="relative rounded-md bg-gray-900 px-3 py-2.5 text-white transition-all duration-75 ease-in group-hover:bg-opacity-0">
						{text}
					</span>
					<span className="mx-1">
						<FaArrowAltCircleRight size={25} />
					</span>
				</button>
			</div>
		</Link>
	);
};
