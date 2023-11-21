'use client';

import { useState, useEffect } from 'react';
import { SubmitButton } from '@/components/SubmitButton';
import InstructionTitle from '@/components/InstructionTitle';
import Editor from '@monaco-editor/react';
import { AllowArray, Call, typedData } from 'starknet';
import { SignButton } from '@/components/SignButton';

export const CodeAreaWithButtons = () => {
	const [callData, setCallData] = useState<AllowArray<Call>>();
	const [typedData, setTypedData] = useState<typedData.TypedData>();

	const [editorWidth, setEditorWidth] = useState('');
	const [editorHeight, setEditorHeight] = useState('');

	const handleResize = () => {
		const breakpoints = [
			{ max: 410, width: '22rem', height: '22rem' },
			{ max: 500, width: '25rem', height: '22rem' },
			{ max: 768, width: '30rem', height: '27rem' },
			{ max: 1536, width: '40rem', height: '30rem' },
		];

		const screenWidth = window.innerWidth;

		const { width, height } = breakpoints.find(({ max }) => screenWidth < max) || {
			width: '60rem',
			height: '30rem',
		};

		setEditorWidth(width);
		setEditorHeight(height);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleInputChange = (message: string | undefined) => {
		try {
			setCallData(JSON.parse(message as string) as AllowArray<Call>);
			setTypedData(JSON.parse(message as string) as typedData.TypedData);
		} catch (error) {
			console.error('Invalid JSON syntax');
		}
	};

	const options = {
		minimap: {
			enabled: false,
		},
		wordWrap: 'on',
		automaticLayout: true,
	};

	return (
		<div className="mt-10 flex flex-col justify-center">
			<InstructionTitle />
			<Editor
				height={editorHeight}
				width={editorWidth}
				theme="vs-dark"
				language="json"
				onChange={(message) => handleInputChange(message)}
				options={options}
				defaultValue={` // Example calldata - please replace before executing
[
	{
		"contractAddress": "0x000000",
		"entrypoint": "example_entrypoint",
		"calldata": ["0"]
	}
]

// Example message - please replace before executing
{
	"domain": {
	  "name": "Example DApp",
	  "chainId": "0x1",
	  "version": "0.0.1"
	},
	"types": {
	  "StarkNetDomain": [
		{ "name": "name", "type": "felt" },
		{ "name": "chainId", "type": "felt" },
		{ "name": "version", "type": "felt" }
	  ],
	  "Message": [{ "name": "message", "type": "felt" }]
	},
	"primaryType": "Message",
	"message": {
	  "message": "1234"
	}
  }
`}
			/>
			<div className="flex min-w-full flex-row items-center justify-between">
				<SubmitButton calls={callData} />
				<SignButton userTypedData={typedData} />
			</div>
		</div>
	);
};
