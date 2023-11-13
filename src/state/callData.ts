import { create } from 'zustand';

type CallDataStore = {
	callData: any;
};

type UpdateCallDataStore = {
	setCallData: (callData: any) => void;
};

export const useCallDataStore = create<CallDataStore & UpdateCallDataStore>((set) => ({
	callData: {},
	setCallData: (callData) => {
		set(() => ({ callData: callData }));
	},
}));
