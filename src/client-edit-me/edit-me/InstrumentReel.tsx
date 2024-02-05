/**
 * ☑️ You can edit MOST of this file to add your own styles.
 */

/**
 * ✅ You can add/edit these imports
 */
import { Instrument, InstrumentSymbol } from "../../common-leave-me";
import { InstrumentSocketClient } from "./InstrumentSocketClient";
import "./InstrumentReel.css";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const reelRef = useRef(null as HTMLDivElement | null);
  const marginRef = useRef(0);
  const speed = 0.2;
  /**
   * ✅ You can edit from here down in this component.
   * Please feel free to add more components to this file or other files if you want to.
   */

  const moveDivLeft = () => {
    if (reelRef.current) {
      reelRef.current.style.marginLeft = `-${marginRef.current}px`;
      marginRef.current = marginRef.current + speed;
    }
  };

  useEffect(() => {
    setInterval(() => {
      requestAnimationFrame(moveDivLeft);
    }, 0);
  });

  const instrumentRectangles = useMemo(() => {
    return instruments.map((instrument) => (
      <InstrumentRectangle key={instrument.name} {...{ instrument }} />
    ));
  }, [JSON.stringify(instruments.map((i) => i.code))]);

  return (
    <div className="reelWrapper">
      <div ref={reelRef} className="instrumentReel">
        {instrumentRectangles}
      </div>
    </div>
  );
}

export default InstrumentReel;
