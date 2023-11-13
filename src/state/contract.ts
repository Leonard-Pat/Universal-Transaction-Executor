import { create } from 'zustand';
import { Abi } from 'starknet';

type ContractStore = {
	contractAddress: string;
  contractAbi?: Abi;
	cairoVersion: string;
};

type UpdateContractStore = {
	setContractAddress: (contractAddress: string, cairoVersion: string) => void;
  setContractAbi: (contractAbi: Abi) => void;
};

export const useContractStore = create<ContractStore & UpdateContractStore>((set) => ({
	contractAddress: '',
	cairoVersion: '',
	setContractAddress: (contractAddress, cairoVersion) =>
		set(() => ({ contractAddress: contractAddress, cairoVersion: cairoVersion })),
  setContractAbi: (contractAbi) => set(() => ({ contractAbi: contractAbi })),
}));
