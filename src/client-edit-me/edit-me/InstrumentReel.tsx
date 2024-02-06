/**
 * ☑️ You can edit MOST of this file to add your own styles.
 */

/**
 * ✅ You can add/edit these imports
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Instrument, InstrumentSymbol } from "../../common-leave-me";
import { InstrumentSocketClient } from "./InstrumentSocketClient";
import { InstrumentRectangle } from "./InstrumentRectangle";
import "./InstrumentReel.css";
import { InstrumentContext } from "./Contexts";

/**
 * ❌ Please do not edit this
 */
const client = new InstrumentSocketClient();
client.subscribe({
  instrumentSymbols: ["BTC", "ETH", "SP500", "US100", "EURUSD", "TSLA", "AAPL"],
});

/**
 * ❌ Please do not edit this hook name & args
 */
function useInstruments(instrumentSymbols: InstrumentSymbol[]) {
  /**
   * ✅ You can edit inside the body of this hook
   */
  const [instruments, setInstruments] = useState([] as Instrument[]);

  useEffect(() => {
    // the distinction between listen and subscribe
    // fixes the duplication issue that arises
    // when multiple instrument reels are created
    // or even when one is torn down and created fresh
    const listener = client.listen(instrumentSymbols, setInstruments);

    return () => {
      client.unlisten(listener);
    };
  }, []);

  return instruments;
}

const useMakeSubReel = (instruments: Instrument[]) => {
  return useMemo(() => {
    return instruments.map((instrument) => (
      <InstrumentRectangle key={instrument.name} code={instrument.code} />
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
  const hoveringRef = useRef(false);

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
      if (!hoveringRef.current) {
        requestAnimationFrame(advanceReelWrapper);
      }
    }, 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const leaderRectangles = useMakeSubReel(instruments);
  const tailRectangles = useMakeSubReel(instruments);
  const onMouseEnter = () => {
    hoveringRef.current = true;
  };
  const onMouseLeave = () => {
    hoveringRef.current = false;
  };

  const leaderWidth = leaderRef.current?.getBoundingClientRect()?.width;
  const maxWidth =
    leaderWidth && leaderWidth > 1
      ? leaderWidth
      : leaderRef.current?.clientWidth;
  return (
    <div
      ref={containerRef}
      style={{ maxWidth: maxWidth }}
      className="instrumentReel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={wrapperRef} className="wrapperForBothSubReels">
        <InstrumentContext.Provider value={instruments}>
          <div
            className="subReel"
            style={{ borderRight: "none" }}
            ref={leaderRef}
          >
            {leaderRectangles}
          </div>
          <div style={{ borderLeft: "none" }} className="subReel">
            {tailRectangles}
          </div>
        </InstrumentContext.Provider>
      </div>
    </div>
  );
}

export default InstrumentReel;
