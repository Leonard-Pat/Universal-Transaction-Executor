'use client';

import { FC, useState } from 'react';
import Editor from '@monaco-editor/react';
import { SubmitButton } from '@/components/SubmitButton';
import { AllowArray, Call } from 'starknet';

export const TextAreaWithHeader = () => {
	const [callData, setCallData] = useState<AllowArray<Call>>();

	const handleInputChange = (message: string | undefined) => {
		try {
			const parsedValue = JSON.parse(message as string);
			setCallData(parsedValue);
		} catch (error) {
			console.error('Invalid JSON syntax');
		}
	};

	const options = {
		minimap: {
			enabled: false,
		},
		wordWrap: 'on',
	};

	return (
		<div className="flex flex-col">
			<h3 className="self-center whitespace-nowrap font-turret-road text-3xl font-bold">
				Enter calldata as a JSON array
			</h3>
			<div className="bg-white p-10">
				<Editor
					height={'30rem'}
					width={'40rem'}
					theme="vs-dark"
					language="json"
					onChange={(message) => handleInputChange(message)}
					options={options}
				/>
			</div>

			<SubmitButton calls={callData} />
		</div>
	);
};
