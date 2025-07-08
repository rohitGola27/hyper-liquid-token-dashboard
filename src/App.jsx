import HoldingsTable from "./components/HoldingTable";
import Navbar from "./components/Navbar";
import { useHyperliquidHoldings } from "./components/useHyperLiquidHoldings";

function App() {
  const { holdings } = useHyperliquidHoldings();
  console.log(holdings?.balances, "holding data");
  return (
    <div>
      <Navbar />
      <div className="holding-section">
        <HoldingsTable balances={holdings?.balances} />
      </div>
    </div>
  );
}

export default App;
