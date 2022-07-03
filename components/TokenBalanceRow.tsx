import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import { useTransferToken }  from "../hooks/useTransferToken";
import { parseBalance, convert2WeiAmount, shortenHex } from "../util";

type TokenBalanceRowProps = {
  tokenAddress: string;
  toAddress?: string;
  amount?: number;
};

const TokenBalanceRow = ({ tokenAddress, toAddress, amount = 1 }: TokenBalanceRowProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const  result  = useTokenBalance(account, tokenAddress);
  const tokenInfo = result.data ?? {name: '' , symbol : '', balance : 0};
  
  const {handleTransfer, pendingTransfer, isClose } = useTransferToken(tokenAddress, toAddress , convert2WeiAmount(amount));

  return (
    <tr>
        <td className="border border-slate-300">{tokenInfo.name ?? ''}</td>
        <td className="border border-slate-300">{tokenInfo.symbol ?? ''}</td>
        <td className="border border-slate-300">{parseBalance(tokenInfo.balance)}</td>
        <td className="border border-slate-300">{shortenHex(toAddress)}</td>
        <td className="border border-slate-300">{amount}</td>
        <td className="border border-slate-300">< button className="roup relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleTransfer} >Transfer</button></td>
    </tr>
  );
};

export default TokenBalanceRow;
