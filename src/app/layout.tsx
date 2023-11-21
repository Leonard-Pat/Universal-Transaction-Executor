import './globals.css';
import type { Metadata } from 'next';
import Banner from './Banner';

export const metadata: Metadata = {
	title: 'UTE',
	description: 'Transaction Executor for Starknet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Banner />
				<div className="absolute m-0 flex min-h-[calc(100%-87px)] min-w-full items-center justify-center bg-black">
					{children}
				</div>
			</body>
		</html>
	);
}
