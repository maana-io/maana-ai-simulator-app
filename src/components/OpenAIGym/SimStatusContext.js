import React from "react";
import { Status } from "@node-sc2/core/constants/enums";

export default React.createContext({
  status: Status.UNKOWN,
  errors: []
});
