import { createContext } from "react";

export const SimulatorClientContext = createContext({
  client: null,
  sessionId: null
});

export default SimulatorClientContext;
