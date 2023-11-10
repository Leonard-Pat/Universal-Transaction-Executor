import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Banner from './banner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'UTE',
	description: 'Transaction Executor for starknet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Banner></Banner>
				{children}
			</body>
		</html>
	);
}
