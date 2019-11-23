import React from "react";
import { Status } from "@node-sc2/core/constants/enums";

export default React.createContext({
  id: "0",
  status: Status.UNKOWN,
  errors: [],
  gameLoop: 0
});
