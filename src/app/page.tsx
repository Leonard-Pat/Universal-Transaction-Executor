import { TextAreaWithHeader } from '@/containers/TextAreaWithHeader';
import { InputWithHeader } from '@/containers/InputWithHeader';
import { DropDownWithHeader } from '@/containers/DropDownWithHeader';

export default function Home() {
	return (
		<main className="flex min-w-full flex-wrap items-center justify-evenly gap-8 px-40 md:flexs-nowrap">
			<TextAreaWithHeader Step={1} Description="Paste in the calldata in a JSON format" />
			<InputWithHeader
				Step={2}
				Description="Enter the contract address"
				label="Contract Address"
				buttonAction="load"
			/>
			<DropDownWithHeader
				Step={3}
				Description="Enter the entry point"
				label="Entry Point"
				buttonAction="execute"
			/>
		</main>
	);
}
