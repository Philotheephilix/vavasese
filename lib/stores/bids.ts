// lib/stores/bids.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Bid = {
  id: string
  taskId: string
  taskTitle: string
  amount: number
  days: number
  proposal: string
  bidder: string
  timestamp: Date
  deadline: Date
  status: "pending" | "approved" | "rejected"
}

type BidStore = {
  bids: Bid[]
  addBid: (bid: Omit<Bid, 'id' | 'status'>) => void
  approveBid: (bidId: string) => void
  rejectBid: (bidId: string) => void
}

export const useBidStore = create<BidStore>()(
  persist(
    (set) => ({
      bids: [],
      addBid: (newBid) => set((state) => ({
        bids: [...state.bids, { 
          ...newBid, 
          id: `BID-${Date.now()}`,
          status: 'pending' 
        }]
      })),
      approveBid: (bidId) => set((state) => ({
        bids: state.bids.map(bid => 
          bid.id === bidId ? { ...bid, status: 'approved' } : bid
        )
      })),
      rejectBid: (bidId) => set((state) => ({
        bids: state.bids.map(bid => 
          bid.id === bidId ? { ...bid, status: 'rejected' } : bid
        )
      }))
    }),
    {
      name: 'bid-storage',
    }
  )
)