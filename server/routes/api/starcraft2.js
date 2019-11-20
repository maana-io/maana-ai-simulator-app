const { createAgent, createEngine, createPlayer } = require('@node-sc2/core');
const { Difficulty, Race } = require('@node-sc2/core/constants/enums');

// const fetch = require('node-fetch');

const run = () => {
  const bot = createAgent({
    async onGameStart({ resources }) {
      const { units, actions, map, frame } = resources.get();
      console.log('game started', frame.getObservation());
    },

    async onStep({ agent, resources }) {
      const { units, actions, map, frame } = resources.get();
      console.log('obs', frame.getObservation());
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
  });

  const engine = createEngine({
    host: '127.0.0.1',
    port: '5000',
  });

  engine.connect().then(() => {
    console.log('connected');
    return engine.runGame('Ladder2019Season3/AcropolisLE.SC2Map', [
      createPlayer({ race: Race.RANDOM }, bot),
      createPlayer({ race: Race.RANDOM, difficulty: Difficulty.MEDIUM }),
    ]);
  });
};

module.exports = app => {
  app.post('/starcraft2/run', (req, res) => {
    // const requestBody = req.body;
    // const apiUrl = generateWebAppURL(
    //   requestBody.locationType,
    //   requestBody.locationData
    // );
    // fetch(apiUrl)
    //   .then(res => res.json())
    //   .then(data => {
    //     res.send({ data });
    //   })
    //   .catch(err => {
    //     res.redirect('/error');
    //   });
    const data = { result: 'OK' };
    console.log('starcraft2/run', data);
    res.send(data);
  });
};
