import { Contract, RpcProvider, SequencerProvider } from 'starknet';

import { NextResponse } from 'next/server';

export async function POST(req: Request, context: any) {
	let body = await req.json();

	let provider;

	if (body.baseUrl) {
		provider = new SequencerProvider({ baseUrl: body.baseUrl });
	} else if (body.nodeUrl) {
		provider = new RpcProvider({ nodeUrl: body.nodeUrl });
	}

	// Check if provider is still undefined
	if (!provider) {
		return NextResponse.error();
	}

	const { contractAddress } = context.params;
	const { abi } = await provider.getClassAt(contractAddress);
	let contract = new Contract(abi, contractAddress, provider);
	const keysArray = Object.keys(contract.functions);
	return NextResponse.json({ message: keysArray });
}

// export async function WHAT() {
//     // let provider = new SequencerProvider({ baseUrl: 'https://alpha4.starknet.io/' });
//     // const { abi } = await provider.getClassAt("0x01b22f7a9d18754c994ae0ee9adb4628d414232e3ebd748c386ac286f86c3066");
//     // console.log(abi);
//     // return NextResponse.json({ abi });
// }

// export async function loadContract(contract_address: string, baseUrl: string): Promise<Contract> {
//     let provider = new SequencerProvider({ baseUrl });
//     const { abi } = await provider.getClassAt(contract_address);
//     if (!abi) {
//       throw new Error("Error while getting ABI");
//     }
//    return new Contract(abi, contract_address, provider);

//   }
