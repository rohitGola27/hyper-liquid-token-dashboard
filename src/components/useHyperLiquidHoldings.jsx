import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useHyperliquidHoldings = () => {
  const [holdings, setHoldings] = useState(null);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      setHoldings(null);
      setLoading(false);
      return;
    }

    const fetchHoldings = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.hyperliquid-testnet.xyz/info",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "spotClearinghouseState",
              user: address, //for testing use can use the any address like zero address 0x0eb4903C3587dcA58813Aa786A678Ad32DBD7AfD
            }),
          }
        );

        const data = await response.json();
        setHoldings(data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [address]);

  return { holdings, loading };
};
