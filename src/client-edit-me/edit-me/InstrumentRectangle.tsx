import { memo, useContext, useEffect, useMemo, useRef } from "react";
import { InstrumentSymbol } from "../../common-leave-me";
import { IconImage } from "./IconImage";
import "./InstrumentReel.css";
import { InstrumentContext } from "./Contexts";
import { NumberText } from "./NumberText";

export const InstrumentRectangle = memo(
  ({ code }: { code: InstrumentSymbol }) => {
    const quoteRef = useRef(null as number | null);
    const instruments = useContext(InstrumentContext);
    const instrument = instruments.find(
      (instrument) => instrument.code === code
    );

    const calculatePercentChange = () => {
      let change = 0;
      if (instrument?.lastQuote && quoteRef.current) {
        change =
          (100 * (instrument.lastQuote - quoteRef.current)) / quoteRef.current;
      }
      return change;
    };
    const updateLastQuote = () => {
      if (instrument?.lastQuote) {
        quoteRef.current = instrument.lastQuote;
      }
    };

    const percentChange = calculatePercentChange();

    useEffect(() => {
      updateLastQuote();
    }, [JSON.stringify(instruments)]);

    return instrument ? (
      <div className="instrumentRectangle">
        <div className="flexRow">
          <IconImage code={instrument.code} />
          <div className="nameBlock">{instrument.name}</div>
        </div>
        <NumberText {...{ percentChange, lastQuote: instrument?.lastQuote }} />
      </div>
    ) : null;
  }
);
