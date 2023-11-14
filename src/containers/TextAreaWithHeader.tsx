'use client';

import { FC, useState } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';
import Editor from '@monaco-editor/react';
import { SubmitButton } from '@/components/SubmitButton';
import { AllowArray, Call } from 'starknet';

export const TextAreaWithHeader: FC<TitleProps> = ({ Step, Description }) => {
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
			<StepTitle Step={Step} Description={Description} />
			<Editor
				height={'40rem'}
				width={'40rem'}
				theme="vs-dark"
				language="json"
				onChange={(message) => handleInputChange(message)}
				options={options}
			/>
			<SubmitButton calls={callData} />
		</div>
	);
};
