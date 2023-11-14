import { FC } from 'react';

export interface TitleProps {
	Step: number;
	Description: string;
}

export const StepTitle: FC<TitleProps> = ({ Step, Description }) => {
	return (
		<div className="flex flex-col items-center pb-2 sm:pb-10">
			<div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400">
				<span className="relative text-white">{Step}.</span>
			</div>
			<h3 className="mt-3 text-center text-gray-500">{Description}</h3>
		</div>
	);
};
