
import { CovalentResponse,Transaction,TransactionStats } from "./types"

const DEPARTMENTS = [
    { name: 'PWD', walletAddress: '0x3fA87a4D992196498f721371617ABC1fFbb6d2b5' },
    { name: 'Medical', walletAddress: '0xb5d85CBf7cB3EE0D56b3bB207D5Fc4B82f43F511' },
    { name: 'Education', walletAddress: '0x3fA87a4D992196498f721371617ABC1fFbb6d2b5' },
  ]

  export const fetchTransactions = async (walletAddress: string): Promise<CovalentResponse> => {
    const API_URL = `https://api.covalenthq.com/v1/eth-mainnet/address/${walletAddress}/transactions_v2/?key=${"cqt_rQpF9PDpf7P7yYfXJpmdvpBDyJDd"}`
    
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error("Failed to fetch data")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("API call failed:", error)
      throw error
    }
  }
  
  export const calculateStats = (transactions: Transaction[]): TransactionStats => {
    const total = transactions.reduce((sum, tx) => sum + parseFloat(tx.value_quote.toString()), 0)
    const avgValue = total / transactions.length
    const totalGas = transactions.reduce((sum, tx) => sum + parseFloat(tx.gas_quote.toString()), 0)
    
    return {
      total: total.toFixed(2),
      average: avgValue.toFixed(2),
      count: transactions.length,
      totalGas: totalGas.toFixed(2)
    }
  }
  