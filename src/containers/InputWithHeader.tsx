'use client';

import { FC, useState } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';
import { SubmitButton, buttonAction } from '@/components/SubmitButton';

interface InputProps extends TitleProps {
	label: string;
	buttonAction: buttonAction;
}

export const InputWithHeader: FC<InputProps> = ({ Step, Description, label, buttonAction }) => {
	const [inputValue, setInputValue] = useState('');
	return (
		<div className="mt-8 flex flex-col items-center justify-between md:mt-0 ">
			<StepTitle Step={Step} Description={Description} />
			<div className="mb-40 flex flex-col">
				<label htmlFor="small-input" className=" inline-block text-sm font-medium text-white">
					{label}
				</label>
				<input
					type="text"
					autoComplete="off"
					data-form-type="other"
					size={25}
					className="mt-2 inline-block rounded-lg border border-gray-300 p-2 text-lg text-gray-900"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
			{buttonAction == 'load' ? (
				<SubmitButton action="load" message={inputValue} />
			) : (
				<SubmitButton action="execute" message={inputValue} />
			)}
		</div>
	);
};
