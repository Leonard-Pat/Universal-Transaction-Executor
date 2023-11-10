export function formatAddress(address: string) {
	const firstFour = address.substring(0, 5);
	const lastFour = address.substring(address.length - 5);
	return `${firstFour}..${lastFour}`; // Return the formatted address
}
