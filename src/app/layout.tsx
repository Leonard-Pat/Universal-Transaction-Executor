import './globals.css';
import type { Metadata } from 'next';
import Banner from './Banner';

import { Inter as FontSans } from 'next/font/google';

import { cn } from '../lib/utils';

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'UTE',
	description: 'Transaction Executor for Starknet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				<Banner />
				<div className="absolute flex min-h-[calc(100%-87px)] min-w-full items-center justify-center bg-black">
					{children}
				</div>
			</body>
		</html>
	);
}
