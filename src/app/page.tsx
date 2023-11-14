import { TextAreaWithHeader } from '@/containers/TextAreaWithHeader';
import { InputWithHeader } from '@/containers/InputWithHeader';
export default function Home() {
	return (
		<main className="flex min-w-full flex-col items-center justify-center">
			<div className="flex min-w-full flex-col justify-evenly gap-10 px-6 sm:gap-8 lg:flex-row lg:px-40 ">
				<TextAreaWithHeader Step={1} Description="Paste in the calldata in a JSON format" />
				<InputWithHeader
					Step={2}
					Description="Enter the contract address"
					label="Contract Address"
					buttonAction="load"
				/>
				<InputWithHeader
					Step={3}
					Description="Enter the entry point"
					label="Entry Point"
					buttonAction="execute"
				/>
			</div>
		</main>
	);
}
