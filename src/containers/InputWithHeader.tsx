import { FC } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';

interface InputProps extends TitleProps {
	label: string;
}

export const InputWithHeader: FC<InputProps> = ({ Step, Description, label }) => {
	return (
		<div className="flex h-1/3 flex-col justify-between">
			<StepTitle Step={Step} Description={Description} />
			<div className="flex flex-col justify-end">
				<div className="mb-40">
					<label htmlFor="small-input" className="mb-2 block text-sm font-medium text-white">
						{label}
					</label>
					<input
						type="text"
						id="small-input"
						className=" block w-full rounded-lg border border-gray-300 bg-gray-600 p-2 text-gray-900  sm:text-xs"
					/>
				</div>
			</div>
		</div>
	);
};
