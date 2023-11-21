'use client';

import { useState, useEffect } from 'react';
import { SubmitButton } from '@/components/SubmitButton';
import InstructionTitle from '@/components/InstructionTitle';
import Editor from '@monaco-editor/react';
import { AllowArray, Call, typedData } from 'starknet';
import { SignButton } from '@/components/SignButton';
import { useRouter } from 'next/navigation';

export const CodeAreaWithButtons = () => {
	const [jsonData, setJsonData] = useState<string>();
	const [editorWidth, setEditorWidth] = useState('');
	const [editorHeight, setEditorHeight] = useState('');
	const router = useRouter();

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

		router.push(`?jsonData=${JSON.stringify(jsonData)}`);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [router, jsonData]);

	const handleInputChange = (message: string | undefined) => {
		try {
			setJsonData(message as string);
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
				defaultValue={` // Example value - please replace before executing
[
	{
		"contractAddress": "0x000000",
		"entrypoint": "example_entrypoint",
		"calldata": ["0"]
	}
]
`}
			/>
			<div className="flex min-w-full flex-row items-center justify-between">
				<SubmitButton />
				<SignButton />
			</div>
		</div>
	);
};
