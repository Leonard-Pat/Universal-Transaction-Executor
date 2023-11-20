import { shortString } from 'starknet';

export function formatChainId(chainId: string) {
	const decodedChainId = shortString.decodeShortString(chainId);

	let formattedChainId = decodedChainId;

	if (formattedChainId.startsWith('SN_')) {
		formattedChainId = formattedChainId.replace('SN_', '');
	}

	if (formattedChainId === 'MAIN') {
		formattedChainId = 'Mainnet';
	}

	if (formattedChainId === formattedChainId.toUpperCase()) {
		formattedChainId =
			formattedChainId.charAt(0).toUpperCase() + formattedChainId.slice(1).toLowerCase();
	}

	return formattedChainId;
}
