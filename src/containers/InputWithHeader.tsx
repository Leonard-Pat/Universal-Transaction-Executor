import { FC } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';
import { SubmitButton, buttonAction } from '@/components/SubmitButton';

interface InputProps extends TitleProps {
	label: string;
	buttonAction: buttonAction;
}

export const InputWithHeader: FC<InputProps> = ({ Step, Description, label, buttonAction }) => {
	return (
		<div className="flex h-1/2 flex-col items-center justify-between ">
			<StepTitle Step={Step} Description={Description} />
			<div className="mb-40 flex flex-col">
				<label htmlFor="small-input" className=" inline-block text-sm font-medium text-white">
					{label}
				</label>
				<input
					type="text"
					id="small-input"
					className="mt-2 inline-block w-full rounded-lg border border-gray-300 bg-gray-600 p-2 text-gray-900  sm:text-xs"
				/>
			</div>
			{buttonAction == 'load' ? <SubmitButton action="load" /> : <SubmitButton action="execute" />}
		</div>
	);
};
