'use client';

import { useState, useEffect } from 'react';
import { SubmitButton } from '@/components/SubmitButton';
import InstructionTitle from '@/components/InstructionTitle';
import { Editor, Monaco } from '@monaco-editor/react';
import { AllowArray, Call, typedData } from 'starknet';
import { SignButton } from '@/components/SignButton';

export const CodeAreaWithButtons = () => {
	const [callData, setCallData] = useState<AllowArray<Call>>();
	const [typedData, setTypedData] = useState<typedData.TypedData>();

	const handleInputChange = (message: string | undefined) => {
		try {
			setCallData(JSON.parse(message as string) as AllowArray<Call>);
			setTypedData(JSON.parse(message as string) as typedData.TypedData);
		} catch (error) {
			console.error('Invalid JSON syntax');
		}
	};

	const options = {
		minimap: {
			enabled: false,
		},
		automaticLayout: true,
	};

	return (
		<div className="mb-10 flex flex-col justify-center">
			<InstructionTitle />
			<div className="h-[22rem] w-[23rem] self-center sm:h-[25rem] sm:w-[30rem] md:h-[25rem] md:w-[35rem] lg:h-[25rem] lg:w-[40rem] xl:h-[30rem]  xl:w-[55rem]">
				<Editor
					theme="vs-dark"
					language="json"
					onChange={(message) => handleInputChange(message)}
					options={options}
					defaultValue={` // Example calldata - please replace before executing
[
	{
		"contractAddress": "0x000000",
		"entrypoint": "example_entrypoint",
		"calldata": ["0"]
	}
]

// Example message - please replace before executing
{
	"domain": {
	  "name": "Example DApp",
	  "chainId": "0x1",
	  "version": "0.0.1"
	},
	"types": {
	  "StarkNetDomain": [
		{ "name": "name", "type": "felt" },
		{ "name": "chainId", "type": "felt" },
		{ "name": "version", "type": "felt" }
	  ],
	  "Message": [{ "name": "message", "type": "felt" }]
	},
	"primaryType": "Message",
	"message": {
	  "message": "1234"
	}
  }
`}
				/>
			</div>

			<div className="flex min-w-full flex-row items-center  justify-between">
				<SubmitButton calls={callData} />
				<SignButton userTypedData={typedData} />
			</div>
		</div>
	);
};
