const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-394291846051-393860153169-IfymGuFxVLVREuekoynvOzc6',
  name: 'jokebot'
});

//start handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  bot.postMessageToChannel(
    'general',
    'initialized',
    params
  );
});

//error handler
bot.on('error', (err) => console.log(err));

//message handler
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }
  //console.log(data);
  handleMessage(data.text);
})

//respond to messages
function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.includes(' yomama')) {
    yoMammaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' help')) {
    runHelp();
  }
}

//tell a Chuck Norris joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random')
  .then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    }

    bot.postMessageToChannel(
      'general',
      `Chuck Norris: ${joke}`,
      params
    );
  })
};

//tell a yo mama joke
function yoMammaJoke() {
  axios.get('http://api.yomomma.info')
  .then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    }

    bot.postMessageToChannel(
      'general',
      `Yo Mama: ${joke}`,
      params
    );
  })
};

//tell a random jokes
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMammaJoke();
  }
}

//show help text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  }

  bot.postMessageToChannel(
    'general',
    `type @jokebot with either 'chucknorris' or 'yomama' or 'random' to get a joke`,
    params
  );
}
