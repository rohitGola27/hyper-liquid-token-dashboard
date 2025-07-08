import { WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const hyperLiquidChain = {
  id: 998,
  name: "Hyper Liquid",
  nativeCurrency: { name: "Hyper Liquid", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hyperliquid-testnet.xyz/evm"] },
  },
};

const config = getDefaultConfig({
  chains: [hyperLiquidChain],
  projectId: "3c81036dac8bb5451ee3e10fd92ea0e0",
});

const queryClient = new QueryClient();

console.log(queryClient, "queryClient");

function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            overlayBlur: "small",
            borderRadius: "medium",
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;
