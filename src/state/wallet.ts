import { create } from 'zustand';
import type { ConnectedStarknetWindowObject } from 'get-starknet-core';

export const useWalletStore = create<{
	account?: ConnectedStarknetWindowObject['account'];
	isWebWallet: boolean;
	connecting: boolean;
	connect: () => Promise<ConnectedStarknetWindowObject['account']>;
	reconnect: () => Promise<void>;
	disconnect: () => void;
}>((set) => ({
	isWebWallet: false,
	connecting: true,
	connect: async () => {
		set({ connecting: true });
		try {
			const { connect } = await import('starknetkit');
			const { InjectedConnector } = await import('starknetkit/injected');
			const wallet = await connect({
				connectors: [
					new InjectedConnector({
						options: { id: 'argentX' },
					}),
					new InjectedConnector({
						options: { id: 'braavos' },
					}),
				],
			});
			if (!wallet?.account) {
				throw new Error('No account found');
			}
			const isWebWallet = wallet.id === 'argentWebWallet';
			set({ account: wallet.account, isWebWallet, connecting: false });
			return wallet.account;
		} catch (e) {
			set({ connecting: false });
			throw e;
		}
	},
	reconnect: async () => {
		set({ connecting: true });
		try {
			const { connect } = await import('starknetkit');
			const wallet = await connect({
				modalMode: 'neverAsk',
			});
			if (!wallet?.account) {
				throw new Error('No account found');
			}
			const isWebWallet = wallet.id === 'argentWebWallet';
			set({ account: wallet.account, isWebWallet, connecting: false });
		} catch (e) {
			set({ connecting: false });
			throw e;
		}
	},
	disconnect: async () => {
		set({ connecting: true });
		try {
			const { disconnect } = await import('starknetkit');
			await disconnect({ clearLastWallet: true });
			set({ account: undefined, isWebWallet: false, connecting: false });
		} catch (e) {
			set({ connecting: false });
			throw e;
		}
	},
}));
