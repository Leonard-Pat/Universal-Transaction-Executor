import { create } from 'zustand';

type ContractStore = {
	contractAddress: string;
	cairoVersion: string;
};

type UpdateContractStore = {
	setContractAddress: (contractAddress: string, cairoVersion: string) => void;
};

export const useContractStore = create<ContractStore & UpdateContractStore>((set) => ({
	contractAddress: '',
	cairoVersion: '',
	setContractAddress: (contractAddress, cairoVersion) =>
		set(() => ({ contractAddress: contractAddress, cairoVersion: cairoVersion })),
}));
