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
				{buttonAction == 'load' ? (
					<SubmitButton action="load" message={inputValue} />
				) : (
					<SubmitButton action="execute" />
				)}
			</div>
		</div>
	);
};
