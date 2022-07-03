import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import { useTransferToken }  from "../hooks/useTransferToken";
import { parseBalance, convert2WeiAmount } from "../util";

type TokenBalanceProps = {
  tokenAddress: string;
  toAddress?: string;
  symbol: string;
  amount?: number;
};

const TokenBalance = ({ tokenAddress, toAddress ,symbol, amount = 1 }: TokenBalanceProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useTokenBalance(account, tokenAddress);
  const {handleTransfer, pendingTransfer, isClose } = useTransferToken(tokenAddress, toAddress , convert2WeiAmount(amount));

  return (
    <div>
      <p>
        {`${symbol} Balance`}: {parseBalance(data ?? 0)}
      </p>
      < button onClick={handleTransfer} >Transfer</button>
    </div>

  );
};

export default TokenBalance;
