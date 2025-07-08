export default function HoldingsTable({ balances }) {
  return (
    <div className="table-container">
      <h2 className="table-title">Your Token Balances</h2>
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Token ID</th>
              <th>Hold</th>
              <th>Total</th>
              <th>Entry Notional</th>
            </tr>
          </thead>
          <tbody>
            {!balances || balances.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No balances available.
                </td>
              </tr>
            ) : (
              balances.map((item, i) => (
                <tr key={i}>
                  <td>{item.coin}</td>
                  <td>{item.token}</td>
                  <td>{item.hold}</td>
                  <td>{item.total}</td>
                  <td>{item.entryNtl}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
