export interface GasMetadata {
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    supports_erc: string[]
    logo_url: string
  }
  
 export interface Transaction {
    block_signed_at: string
    block_height: number
    tx_hash: string
    tx_offset: number
    successful: boolean
    from_address: string
    to_address: string
    value: string
    value_quote: number
    gas_quote: number
    gas_metadata: GasMetadata
    gas_price: number
    fees_paid: string
  }
  
 export interface CovalentResponse {
    address: string
    updated_at: string
    next_update_at: string
    quote_currency: string
    chain_id: number
    items: Transaction[]
  }
  
 export interface TransactionStats {
    total: string
    average: string
    count: number
    totalGas: string
  }
 export interface ChartDataPoint {
    date: string
    amount: number
  }