import { create } from 'zustand';
import type { ConnectedStarknetWindowObject } from 'get-starknet-core';

type WalletStore = {
	account?: ConnectedStarknetWindowObject['account'];
	connecting: boolean;
	connect: () => Promise<ConnectedStarknetWindowObject['account']>;
	reconnect: () => Promise<void>;
	disconnect: () => void;
};

export const useWalletStore = create<WalletStore>((set) => ({
	connecting: true,
	connect: async () => {
		try {
			const { connect } = await import('starknetkit');
			const wallet = await connect({
				modalMode: 'alwaysAsk',
			});
			if (!wallet || !wallet.account) {
				throw new Error('No account found');
			}
			set({ account: wallet.account, connecting: false });
		} catch (e) {
			set({ connecting: false });
			throw e;
		}
	},
	reconnect: async () => {
		try {
			const { connect } = await import('starknetkit');
			const wallet = await connect({
				modalMode: 'neverAsk',
			});
			if (!wallet?.account) {
				throw new Error('No account found');
			}
			set({ account: wallet.account, connecting: false });
		} catch (e) {
			set({ connecting: false });
			throw e;
		}
	},
	disconnect: async () => {
		try {
			const { disconnect } = await import('starknetkit');
			await disconnect({ clearLastWallet: true });
			set({ account: undefined, connecting: false });
		} catch (e) {
			set({ connecting: false });
			throw e;
		}
	},
}));
