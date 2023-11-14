import { TextAreaWithHeader } from '@/containers/TextAreaWithHeader';
export default function Home() {
	return (
		<main className="flex min-w-full flex-col items-center justify-center">
			<TextAreaWithHeader Step={1} Description="Please enter an array of calls in a JSON format" />
		</main>
	);
}
