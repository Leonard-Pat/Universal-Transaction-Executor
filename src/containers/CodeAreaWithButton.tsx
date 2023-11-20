'use client';

import { useState, useEffect } from 'react';
import { SubmitButton } from '@/components/SubmitButton';
import InstructionTitle from '@/components/InstructionTitle';
import Editor from '@monaco-editor/react';
import { AllowArray, Call, selector } from 'starknet';

export const TextAreaWithHeader = () => {
	const [callData, setCallData] = useState<AllowArray<Call>>();
	const [editorWidth, setEditorWidth] = useState('');
	const [editorHeight, setEditorHeight] = useState('');

	useEffect(() => {
		const handleResize = () => {
			const breakpoints = [
				{ max: 410, width: '22rem', height: '25rem' },
				{ max: 500, width: '25rem', height: '25rem' },
				{ max: 768, width: '30rem', height: '30rem' },
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
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
		autmaticLayout: true,
	};

	return (
		<div className="mt-10 flex flex-col">
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
		"callData": ["0"]
	}
]
`}
			/>
			<SubmitButton calls={callData} />
		</div>
	);
};
