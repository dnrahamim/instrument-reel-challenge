/**
 * ☑️ You can edit MOST of this file to add your own styles.
 */

/**
 * ✅ You can add/edit these imports
 */
import { Instrument, InstrumentSymbol } from "../../common-leave-me";
import { InstrumentSocketClient } from "./InstrumentSocketClient";
import "./InstrumentReel.css";
import { useEffect, useState } from "react";

/**
 * ❌ Please do not edit this
 */
const client = new InstrumentSocketClient();

/**
 * ❌ Please do not edit this hook name & args
 */
function useInstruments(instrumentSymbols: InstrumentSymbol[]) {
  /**
   * ✅ You can edit inside the body of this hook
   */
  const [instruments, setInstruments] = useState([] as Instrument[]);

  useEffect(() => {
    client.subscribe({ instrumentSymbols, setInstruments });

    return () => {
      client.unsubscribe({ instrumentSymbols });
    };
  }, []);

  return instruments;
}

const IconImage = ({ code }: { code: InstrumentSymbol }) => {
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

const InstrumentRectangle = ({ instrument }: { instrument: Instrument }) => {
  return (
    <div className="instrumentRectangle">
      <IconImage code={instrument.code} />
      <div className="nameBlock">{instrument.name}</div>
      <div>{instrument.lastQuote}</div>
    </div>
  );
};

export interface InstrumentReelProps {
  instrumentSymbols: InstrumentSymbol[];
}

function InstrumentReel({ instrumentSymbols }: InstrumentReelProps) {
  /**
   * ❌ Please do not edit this
   */
  const instruments = useInstruments(instrumentSymbols);

  /**
   * ✅ You can edit from here down in this component.
   * Please feel free to add more components to this file or other files if you want to.
   */

  return (
    <div className="instrumentReel">
      {instruments.map((instrument) => (
        <InstrumentRectangle key={instrument.name} {...{ instrument }} />
      ))}
    </div>
  );
}

export default InstrumentReel;
