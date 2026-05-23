const DashboardCards = ({
  walletBalance,
  totalInvestment,
  totalROI,
  totalLevelIncome,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      <div>
        <h3>Wallet Balance</h3>
        <p>{walletBalance}</p>
      </div>

      <div>
        <h3>Total Investment</h3>
        <p>{totalInvestment}</p>
      </div>

      <div>
        <h3>Total ROI</h3>
        <p>{totalROI}</p>
      </div>

      <div>
        <h3>Level Income</h3>
        <p>{totalLevelIncome}</p>
      </div>
    </div>
  );
};

export default DashboardCards;