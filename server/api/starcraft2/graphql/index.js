// --- External imports
const { createAgent, createEngine, createPlayer } = require("@node-sc2/core");
const { Difficulty, Race } = require("@node-sc2/core/constants/enums");
const gql = require("graphql-tag");

// --- Internal imports
const { createClient } = require("../../../GraphQLClient");

// --- Constants

const Status = {
  Idle: "Idle",
  Starting: "Starting",
  Running: "Running",
  Stopped: "Stopped",
  Done: "Done",
  Error: "Error"
};

// --- Implementation

// Game state management
const gameState = {};

extractGameStatus = gameState => ({
  id: gameState.id,
  status: gameState.status,
  errors: gameState.errors,
  gameLoop: gameState.gameLoop
});

const newGameState = ({ id }) => ({
  id,
  status: Status.Idle,
  gameLoop: 0,
  errors: []
});

const getGameState = ({ id }) => {
  let state = gameState[id];
  if (!state) {
    state = newGameState({ id });
    setGameState({ state });
  }
  return state;
};

const setGameState = ({ state }) => (gameState[state.id] = state);

const GET_INFO = gql`
  query getInfo {
    info {
      id
      name
      description
    }
  }
`;

const newBot = ({ agent, uri, token }) => {
  const client = createClient({ uri, token });
  return { agent, uri, token, client };
};

const run = async ({ config }) => {
  console.log("Running StarCraft II simulation...");

  const id = config.id || 0;
  const uri =
    config.uri ||
    "https://lastknowngood.knowledge.maana.io:8443/service/b00a2def-69a1-4238-80f7-c7920aa0afd4/graphql";
  const token = config.token || "";

  const state = getGameState({ id });

  const agent = createAgent({
    async onGameStart({ resources }) {
      const { units, actions, map, frame } = resources.get();
      console.log("onGameStarted");
      const state = getGameState({ id });
      state.status = Status.Running;
      // console.log("onGameStarted", frame.getObservation());
    },

    async onStep({ agent, resources }) {
      const { units, actions, map, frame } = resources.get();
      const { gameLoop } = frame.getObservation();

      const state = getGameState({ id });
      if (state.status === "Running") {
        console.log("onStep", gameLoop);
        state.gameLoop = gameLoop;
        const { client } = state.bot1;
        const x = await client.query({ query: GET_INFO });
        console.log("res", x);
      } else {
        console.log("onStep --- STOPPING");
      }

      // return new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  state.bot1 = newBot({ agent, uri, token });

  console.log("Creating engine...");
  const engine = createEngine({
    host: "127.0.0.1",
    port: "5000"
  });
  state.engine = engine;

  try {
    console.log("Connecting...");

    state.connection = await engine.connect();
    console.log("... connected: ", state.connection);

    state.status = Status.Starting;

    state.runGame = engine
      .runGame("Ladder2019Season3/AcropolisLE.SC2Map", [
        createPlayer({ race: Race.RANDOM }, state.bot1.agent),
        createPlayer({ race: Race.RANDOM, difficulty: Difficulty.MEDIUM })
      ])
      .then(rg => {
        console.log("runGame complete", rg);
        const state = getGameState({ id });
        state.status = Status.Done;
      });
  } catch (e) {
    state.status = Status.Error;
    state.errors = [e];
  }
  return extractGameStatus(state);
};

const stop = async ({ id }) => {
  const state = getGameState({ id });
  // console.log("starcraft2/stop", state);
  state.status = Status.Stopped;
  return extractGameStatus(state);
};

const gameStatus = async ({ id }) => {
  const state = getGameState({ id });
  // console.log("starcraft2/update", state);
  return extractGameStatus(state);
};

// --- GraphQL resolvers

const resolver = {
  Query: {
    gameStatus: async (_, { id }) => gameStatus({ id })
  },
  Mutation: {
    run: async (_, { config }) => run({ config }),
    stop: async (_, { id }) => stop({ id })
  }
};

// --- Exports

module.exports = {
  resolver
};
