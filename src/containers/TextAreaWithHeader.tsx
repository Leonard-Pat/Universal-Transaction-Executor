import { FC } from 'react';
import { StepTitle, TitleProps } from '@/components/StepTitle';

export const TextAreaWithHeader: FC<TitleProps> = ({ Step, Description }) => {
	return (
		<div className="flex h-1/3 flex-col justify-center">
			<StepTitle Step={Step} Description={Description} />
			<div></div>
			<textarea
				id="message"
				className="mb-40 block h-72 w-full resize-none rounded-lg border border-gray-300 bg-gray-600 p-2.5 text-sm text-white "
				placeholder="Insert calldata here"
			></textarea>
		</div>
	);
};
