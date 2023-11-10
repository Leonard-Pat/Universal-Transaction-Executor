import { TextAreaWithHeader } from '@/containers/TextAreaWithHeader';
import { InputWithHeader } from '@/containers/InputWithHeader';

export default function Home() {
	return (
		<main className="flex min-w-full flex-col items-center justify-evenly px-40 md:flex-row">
			<TextAreaWithHeader Step={1} Description="Paste in the compiled calldata in a JSON format" />
			<InputWithHeader Step={2} Description="Enter the contract address" label="Contract Address" />
			<InputWithHeader Step={3} Description="Enter the entry point" label="Entry Point" />
		</main>
	);
}
