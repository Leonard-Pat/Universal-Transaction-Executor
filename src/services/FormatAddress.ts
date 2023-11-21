export function formatAddress(address: string, range: number = 5) {
	const firstFour = address.substring(0, range);
	const lastFour = address.substring(address.length - range);
	return `${firstFour}..${lastFour}`; // Return the formatted address
}
