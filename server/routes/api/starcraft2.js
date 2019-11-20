const { createAgent, createEngine, createPlayer } = require("@node-sc2/core");
const { Difficulty, Race } = require("@node-sc2/core/constants/enums");

// const fetch = require('node-fetch');

const run = async ({ req, res }) => {
  console.log("Running StarCraft II simulation...");

  const bot = createAgent({
    async onGameStart({ resources }) {
      const { units, actions, map, frame } = resources.get();
      console.log("onGameStarted");
      // console.log("onGameStarted", frame.getObservation());
    },

    async onStep({ agent, resources }) {
      const { units, actions, map, frame } = resources.get();
      console.log("onStep");
      // console.log("onStep", frame.getObservation());
      // return new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  console.log("Creating engine...");
  const engine = createEngine({
    host: "127.0.0.1",
    port: "5000"
  });

  console.log("Connecting...");
  const c = await engine.connect();

  console.log("connected", c);
  engine
    .runGame("Ladder2019Season3/AcropolisLE.SC2Map", [
      createPlayer({ race: Race.RANDOM }, bot),
      createPlayer({ race: Race.RANDOM, difficulty: Difficulty.MEDIUM })
    ])
    .then(rg => {
      console.log("runGame complete", rg);
    });

  const data = { result: "OK" };
  console.log("starcraft2/run", data);
  res.send(data);
};

const status = async ({ req, res }) => {
  const data = { result: "BOO" };
  console.log("starcraft2/status", data);
  res.send(data);
};

module.exports = app => {
  app.post("/starcraft2/run", async (req, res) => run({ req, res }));
  app.get("/starcraft2/status", async (req, res) => status({ req, res }));
};
