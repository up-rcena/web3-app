import Moralis from "moralis";

export default async function handler(req, res) {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  const address = process.env.MORALIS_ADDRESS;

  const [nativeBalance, tokenBalances] = await Promise.all([
    Moralis.EvmApi.account.getNativeBalance({ address }),
    Moralis.EvmApi.account.getTokenBalances({ address }),
  ]);
  res.status(200).json({
    nativeBalance: nativeBalance.result.balance.ether,
    tokenBalances: tokenBalances.result.map((token) => token.display()),
  });
}
