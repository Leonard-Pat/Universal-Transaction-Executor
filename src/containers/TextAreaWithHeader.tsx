'use client';

import { FC } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';
import { useCallDataStore } from '@/state/callData';

export const TextAreaWithHeader: FC<TitleProps> = ({ Step, Description }) => {
	const setCallData = useCallDataStore((state) => state.setCallData);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		try {
			const parsedValue = JSON.parse(e.target.value);
			setCallData(parsedValue);
		} catch (error) {
			// Handle the error case when the value is not valid JSON
			console.error('Invalid JSON syntax');
		}
	};

	return (
		<div className="flex flex-col">
			<StepTitle Step={Step} Description={Description} />
			<textarea
				id="message"
				className="mb-40 resize-none rounded-lg border border-gray-300 text-lg text-black lg:w-full "
				placeholder="Insert calldata here"
				rows={8}
				onChange={handleInputChange}
			></textarea>
		</div>
	);
};
