'use client';

import { useState, useEffect } from 'react';
import InstructionTitle from '@/components/InstructionTitle';
import { SwitchTabButton } from '@/components/SwitchTabButton';
import { SignButton } from '@/components/SignButton';
import { useRouter } from 'next/navigation';

export const SignatureAreaWithButtons = () => {
	const [messageHash, setMessageHash] = useState('');
	const router = useRouter();
	useEffect(() => {
		router.push(`?message=${messageHash}`);
	}, [messageHash, router]);

	return (
		<div className="mt-10 flex flex-col justify-center">
			<InstructionTitle />
			<input
				type="text"
				value={messageHash}
				className=""
				onChange={(e) => setMessageHash(e.target.value)}
			/>
			<div className="group relative inline-flex overflow-hidden bg-indigo-800 text-white">
				hello
			</div>
			<div></div>
			<div className="flex min-w-full flex-row items-center justify-between">
				<SignButton />
				<SwitchTabButton text={'Transaction Executor'} link={'transaction'} />
			</div>
		</div>
	);
};
