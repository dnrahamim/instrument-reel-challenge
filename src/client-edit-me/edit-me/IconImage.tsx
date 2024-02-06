import { InstrumentSymbol } from "../../common-leave-me";

export const IconImage = ({ code }: { code: InstrumentSymbol }) => {
  let src = "";
  switch (code) {
    case "BTC":
      src = "crypto/BTC.svg";
      break;
    case "ETH":
      src = "crypto/ETH.svg";
      break;
    case "SP500":
      src = "indicies/SP500.svg";
      break;
    case "US100":
      src = "indicies/US100.svg";
    case "AAPL":
      src = "stocks/AAPL.svg";
      break;
    case "TSLA":
      src = "stocks/TSLA.svg";
      break;
    case "EURUSD":
      src = "forex/EUR.svg";
      break;
    default:
    // code block
  }
  return <img className="iconImg" src={src} />;
};
