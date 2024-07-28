import {create} from 'zustand'

export const useStore = create((set) => ({
    provider:'',
    updateProvider: (newProvider) => set({ provider: newProvider }),
  }))