import type { BigNumberish } from "@ethersproject/bignumber";
import React, { useCallback, useState } from 'react'
import { useCallWithGasPrice } from './useCallWithGasPrice';
import useTokenContract from "./useTokenContract";


export const useTransferToken = (tokenAddress: string, toAddress: string, amount: BigNumberish) => {
  const [requestedTransfer, setRequestTransfer] = useState(false)
  const [ isClose, setClose ] = useState(false)
  
  const { callWithGasPrice } = useCallWithGasPrice()
  const [pendingTransfer, setPendingSell] = useState(false)
  const marketplaceContract = useTokenContract(tokenAddress);

  const handleTransfer = useCallback(async () => {
    setPendingSell(true)
    try {
      
      setRequestTransfer(true)
      const tx = await callWithGasPrice(marketplaceContract, 'transfer', [toAddress, amount])
      const receipt = await tx.wait()

      if (receipt.status) {
        
        setRequestTransfer(false)
        setClose(true)
      } else {
        // user rejected tx or didn't go thru
        
        setRequestTransfer(false)
        
      }
      console.log(receipt)
    } catch (e) {
      console.error(e)
      
    } finally {
      setPendingSell(false)
    }
  }, [
    tokenAddress, amount,
    marketplaceContract,
    callWithGasPrice,
  ])
 

  return { handleTransfer, requestedTransfer, pendingTransfer, isClose }
}
  
