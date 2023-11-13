'use client';

import { FC, useState } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';
import { SubmitButton, buttonAction } from '@/components/SubmitButton';

interface InputProps extends TitleProps {
	label: string;
	buttonAction: buttonAction;
}

export const DropDownWithHeader: FC<InputProps> = ({ Step, Description, label, buttonAction }) => {
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
					className="mt-2 inline-block w-full rounded-lg border border-gray-300 bg-gray-600 p-2 text-gray-900  sm:text-xs"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				{buttonAction == 'load' ? (
					<SubmitButton action="load" message={inputValue} />
				) : (
					<SubmitButton action="execute" message={inputValue} />
				)}
			</div>
		</div>
	);
};
