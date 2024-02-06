export const NumberText = ({
  percentChange,
  lastQuote,
}: {
  percentChange: number;
  lastQuote: number;
}) => {
  let className = "flexRow";
  if (percentChange > 0) {
    className = `${className} positiveChange`;
  }
  if (percentChange < 0) {
    className = `${className} negativeChange`;
  }
  let maybePlus = percentChange > 0 ? "+" : "";
  return (
    <div className={className}>
      <div className="quoteBlock">{lastQuote}</div>
      <div>
        {maybePlus}
        {percentChange.toFixed(3)}
      </div>
    </div>
  );
};
