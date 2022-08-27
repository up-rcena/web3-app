import { EvmChain } from "@moralisweb3/evm-utils";
import Moralis from "moralis";

function Native({ nativeBalance, address }) {
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance} ETH</h3>
    </div>
  );
}

export async function getServerSideProps(context) {
 const { MORALIS_API_KEY, MORALIS_ADDRESS }  = process.env;

  await Moralis.start({ apiKey: MORALIS_API_KEY });

  const chain = EvmChain.ETHEREUM;

  const address = MORALIS_ADDRESS;
  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address,
    chain,
  });

  return {
    props: {
      address,
      nativeBalance: nativeBalance.result.balance.ether,
    },
  };
}

export default Native;
