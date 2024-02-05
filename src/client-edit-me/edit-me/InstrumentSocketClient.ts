/**
 * ☑️ You can edit MOST of this file to add your own styles.
 */

/**
 * ✅ You can add/edit these imports
 */
import {
  Instrument,
  InstrumentSymbol,
  WebSocketClientMessageJson,
  WebSocketMessage,
  WebSocketReadyState,
  WebSocketServerMessageJson,
} from "../../common-leave-me";

/**
 * Notes:
 * 
 * To subscribe or unsubscribe to/from instrument(s), send a message to the server with the following format:
 * 
 * export type WebSocketClientMessageJson =
  | {
      type: "subscribe";
      instrumentSymbols: InstrumentSymbol[];
    }
  | {
      type: "unsubscribe";
      instrumentSymbols: InstrumentSymbol[];
    };
  *
  * The server will start responding with a message with the following format:
  * 
  * export type WebSocketServerMessageJson = {
      type: "update";
      instruments: Instrument[];
    };
 */

/**
 * ❌ Please do not edit this class name
 */
export class InstrumentSocketClient {
  /**
   * ❌ Please do not edit this private property name
   */
  private _socket: WebSocket;

  /**
   * ✅ You can add more properties for the class here (if you want) 👇
   */

  constructor() {
    /**
     * ❌ Please do not edit this private property assignment
     */
    this._socket = new WebSocket("ws://localhost:3000/ws");
  }

  /**
   * ✅ You can edit from here down 👇
   */

  subscribe({
    instrumentSymbols,
    setInstruments,
  }: {
    instrumentSymbols: InstrumentSymbol[];
    setInstruments: React.Dispatch<React.SetStateAction<Instrument[]>>;
  }) {
    const sendSubscribe = () => {
      this._socket.send(
        JSON.stringify({
          ...{
            type: "subscribe",
            instrumentSymbols,
          },
        } as WebSocketClientMessageJson) as WebSocketMessage
      );
    };
    if ((this._socket.readyState as WebSocketReadyState) === 1) {
      sendSubscribe();
    } else {
      this._socket.addEventListener("open", sendSubscribe);
    }

    // Listen for messages
    this._socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketServerMessageJson;
        setInstruments(data.instruments);
      } catch (error) {
        reportError({ message: String(error) });
      }
    });
  }

  unsubscribe({
    instrumentSymbols,
  }: {
    instrumentSymbols: InstrumentSymbol[];
  }) {
    this._socket.send(
      JSON.stringify({
        ...{
          type: "unsubscribe",
          instrumentSymbols,
        },
      } as WebSocketClientMessageJson) as WebSocketMessage
    );
  }
}
