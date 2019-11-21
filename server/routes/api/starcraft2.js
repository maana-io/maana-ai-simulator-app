const { createAgent, createEngine, createPlayer } = require("@node-sc2/core");
const { Difficulty, Race } = require("@node-sc2/core/constants/enums");

const Status = {
  Idle: "Idle",
  Starting: "Starting",
  Running: "Running",
  Stopped: "Stopped",
  Done: "Done",
  Error: "Error"
};

const simulatorState = {};

const newState = ({ key }) => ({ key, status: Status.Idle });

const getState = ({ key }) => {
  let state = simulatorState[key];
  if (!state) {
    state = newState({ key });
    simulatorState[key] = state;
  }
  return state;
};

// const setState = ({ state }) => (simulatorState[state.key] = state);

const run = async ({ req, res }) => {
  console.log("Running StarCraft II simulation...");

  // @@TODO
  const key = 0;

  const state = getState({ key });

  const bot = createAgent({
    async onGameStart({ resources }) {
      const { units, actions, map, frame } = resources.get();
      console.log("onGameStarted");
      const state = getState({ key });
      state.status = Status.Running;
      // console.log("onGameStarted", frame.getObservation());
    },

    async onStep({ agent, resources }) {
      const { units, actions, map, frame } = resources.get();
      const { gameLoop } = frame.getObservation();

      const state = getState({ key });
      if (state.status === "Running") {
        console.log("onStep", gameLoop);
        state.gameLoop = gameLoop;
      } else {
        console.log("onStep --- STOPPING");
        return false;
      }

      // return new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  state.bot1 = { bot };

  console.log("Creating engine...");
  const engine = createEngine({
    host: "127.0.0.1",
    port: "5000"
  });
  state.engine = engine;

  try {
    console.log("Connecting...");
    const c = await engine.connect();
    state.connection = c;

    console.log("... connected: ", c);
    state.status = Status.Starting;
    engine
      .runGame("Ladder2019Season3/AcropolisLE.SC2Map", [
        createPlayer({ race: Race.RANDOM }, bot),
        createPlayer({ race: Race.RANDOM, difficulty: Difficulty.MEDIUM })
      ])
      .then(rg => {
        console.log("runGame complete", rg);
        const state = getState({ key });
        state.status = Status.Done;
      });

    res.send(state.status);
  } catch (e) {
    state.status = Status.Error;
    res.send(state.status);
  }
};

const stop = async ({ req, res }) => {
  // @@TODO
  const key = 0;

  const state = getState({ key });
  // console.log("starcraft2/status", state);
  state.status = Status.Stopped;
  res.send(state.status);
};

const status = async ({ req, res }) => {
  // @@TODO
  const key = 0;

  const state = getState({ key });
  // console.log("starcraft2/status", state);
  res.send(state.status);
};

const update = async ({ req, res }) => {
  // @@TODO
  const key = 0;

  const state = getState({ key });
  // console.log("starcraft2/update", state);
  res.send({ Status: state.status, gameLoop: state.gameLoop });
};

module.exports = app => {
  app.post("/starcraft2/run", async (req, res) => run({ req, res }));
  app.post("/starcraft2/stop", async (req, res) => stop({ req, res }));
  app.get("/starcraft2/status", async (req, res) => status({ req, res }));
  app.get("/starcraft2/update", async (req, res) => update({ req, res }));
};
