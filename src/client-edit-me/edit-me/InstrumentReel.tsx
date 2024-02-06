/**
 * ☑️ You can edit MOST of this file to add your own styles.
 */

/**
 * ✅ You can add/edit these imports
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Instrument, InstrumentSymbol } from "../../common-leave-me";
import { InstrumentSocketClient } from "./InstrumentSocketClient";
import { IconImage } from "./IconImage";
import "./InstrumentReel.css";

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

const InstrumentRectangle = ({ instrument }: { instrument: Instrument }) => {
  return (
    <div className="instrumentRectangle">
      <IconImage code={instrument.code} />
      <div className="nameBlock">{instrument.name}</div>
      <div>{instrument.lastQuote}</div>
    </div>
  );
};

const useMakeSubReel = (instruments: Instrument[]) => {
  return useMemo(() => {
    return instruments.map((instrument) => (
      <InstrumentRectangle key={instrument.name} {...{ instrument }} />
    ));
  }, [JSON.stringify(instruments.map((i) => i.code))]);
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
  const containerRef = useRef(null as HTMLDivElement | null);
  const wrapperRef = useRef(null as HTMLDivElement | null);
  const leaderRef = useRef(null as HTMLDivElement | null);
  const marginRef = useRef(0);
  const speed = 0.2; // pixels per ms

  const advanceReelWrapper = () => {
    if (wrapperRef.current && containerRef.current && leaderRef.current) {
      wrapperRef.current.style.marginLeft = `-${marginRef.current}px`;
      marginRef.current = marginRef.current + speed;

      var containerRect = containerRef.current.getBoundingClientRect();
      var leaderRect = leaderRef.current.getBoundingClientRect();
      if (leaderRect.right <= containerRect.left) {
        marginRef.current = 0;
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      requestAnimationFrame(advanceReelWrapper);
    }, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const leaderRectangles = useMakeSubReel(instruments);
  const tailRectangles = useMakeSubReel(instruments);

  return (
    <div ref={containerRef} className="instrumentReel">
      <div ref={wrapperRef} className="wrapperForBothSubReels">
        <div className="subReel" ref={leaderRef}>
          {leaderRectangles}
        </div>
        <div className="subReel">{tailRectangles}</div>
      </div>
    </div>
  );
}

export default InstrumentReel;
