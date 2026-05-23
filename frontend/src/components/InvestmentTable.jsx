const InvestmentTable = ({ investments }) => {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Plan</th>
          <th>Amount</th>
          <th>ROI %</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {investments.map((investment) => (
          <tr key={investment._id}>
            <td>{investment.plan}</td>

            <td>{investment.amount}</td>

            <td>{investment.dailyROI}%</td>

            <td>{investment.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvestmentTable;