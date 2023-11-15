'use client';

import { FC, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { SubmitButton } from '@/components/SubmitButton';
import { AllowArray, Call } from 'starknet';
import InstructionTitle from '@/components/InstructionTitle';

export const TextAreaWithHeader = () => {
	const [callData, setCallData] = useState<AllowArray<Call>>();
	const [editorWidth, setEditorWidth] = useState('');

	useEffect(() => {
		const handleResize = () => {
			const breakpoints = [
				{ max: 410, width: '20rem' },
				{ max: 500, width: '25rem' },
				{ max: 768, width: '30rem' },
				{ max: 1536, width: '40rem' },
			];

			const screenWidth = window.innerWidth;

			const { width } = breakpoints.find(({ max }) => screenWidth < max) || { width: '60rem' };

			setEditorWidth(width);
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
				height={'30rem'}
				width={editorWidth}
				theme="vs-dark"
				language="json"
				onChange={(message) => handleInputChange(message)}
				options={options}
			/>
			<SubmitButton calls={callData} />
		</div>
	);
};
