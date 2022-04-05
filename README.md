# Sern Handler

<a href="https://www.npmjs.com/package/sern-handler">
<img src="https://img.shields.io/npm/v/sern_handler?maxAge=3600" alt="NPM version" /></a> <a href="https://www.npmjs.com/package/sern-handler"><img src="https://img.shields.io/npm/dt/sern_handler?maxAge=3600" alt="NPM downloads" /></a> <a href="https://www.npmjs.com/package/sern-handler"><img src="https://img.shields.io/badge/builds-stable" alt="Builds Passing"></a>

Sern can automate and streamline development of your discord bot with new version compatibility and full customization.

- A reincarnation of [this old project](https://github.com/jacoobes/sern_handler)

## Installation

```sh
npm install sern-handler
```

```sh
yarn add sern-handler
```

```sh
pnpm add sern-handler
```

## Basic Usage

#### ` index.js (CommonJS)`

```js
const { Client, Intents } = require('discord.js');
const { Sern } = require('sern-handler');
const { prefix, token } = require('../src/secrets.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

new Sern.Handler({
  client,
  prefix,
  commands: 'src/commands',
  privateServers: [
    {
      test: true,
      id: 'server-id',
    },
  ],
  init: async (handler) => {
    // Optional function to initialize anything else on bot startup
  },
});

client.login(token);
```

#### ` ping.js (CommonJS)`

```js
const { Sern, Types } = require('sern-handler');
const { Ok } = require('ts-results');

module.exports = {
  alias: [],
  desc: 'A ping pong command',
  visibility: 'private',
  test: false,
  type: Sern.CommandType.SLASH | Sern.CommandType.TEXT,
  execute: async ({ message, interaction }, args) => 'pong!',
};
```

See [documentation](https://sern-handler.js.org) for TypeScript examples and more

## Links ![link](https://img.shields.io/badge/Coming-Soon-purple)

- [Official Documentation](https://sern-handler.js.org)
- [Example Bot](https://github.com/sern-handler/cheemsBanker)
- [Support Server](https://discord.com/invite/Yvb7DnqjXX)

## Contribute

- Pull up on [issues](https://github.com/sern-handler/Sern/issues) and tell us, if there are bugs
- All kinds of contributions are welcomed!

## TODO

- [ ] Default commands
- [ ] Categories
- [ ] Ruling out all bugs in the command system
- [ ] Better support for slash commands
- [ ] More Build scripts
- [ ] Logger
