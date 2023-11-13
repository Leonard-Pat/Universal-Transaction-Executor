import { Contract, Provider, RpcProvider, SequencerProvider } from 'starknet';

import { NextResponse } from 'next/server';

export async function POST(req: Request, context: any) {
	let body = await req.json();

	const provider = body.rpc
		? new RpcProvider({ nodeUrl: body.baseUrl })
		: new SequencerProvider({ baseUrl: body.baseUrl });

	const { contractAddress } = context.params;
	const { abi } = await provider.getClassAt(contractAddress);
	let contract = new Contract(abi, contractAddress, provider);
	const keysArray = Object.keys(contract.functions);
	return NextResponse.json({ message: keysArray });
}
