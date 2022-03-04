# @glowbot/cogs
A wonderful package to help managing commands of discord.js

# caution
`module.exports.name`,`export name`,`module.exports.path`,`export path` are overwritten by it's file name and full path

# examples 
Expamples are in the examples directory.
You can simpliy import by  
- commonjs
```cjs
const Cog = require("@glowbot/cogs")
//or
const {Cog} = require("@glowbot/cogs")
```
- modulejs
```mjs
import {Cog} from "@glowbot/cogs"
```
- typescript
```ts
import {Cog} from "@glowbot/cogs"
```
and use by
```js
const cog = new Cog("./cogs") // Path is defaultly "./"
console.log(cog) // Cog(0) [Map] {}


cog.loadAll()
console.log(cog) /* Cog(2) [Map] {
  '1' => {
    execute: [Function: execute],
    name: '1',
    path: 'HIDDEN/examples/cogs/1.js'
  },
  '2' => {
    execute: [Function: execute],
    name: '2',
    path: 'HIDDEN/examples/cogs/2.js'
  }
}*/
cog.unloadAll()
console.log(cog) // Cog(0) [Map] {}


cog.loadAll()
cog.unload("1")
console.log(cog) /* Cog(1) [Map] {
  '2' => {
    execute: [Function: execute],
    name: '2',
    path: 'HIDDEN/examples/cogs/2.js'
  }
}*/


cog.load("1.js")
console.log(cog) /* Cog(2) [Map] {
  '1' => {
    execute: [Function: execute],
    name: '1',
    path: 'HIDDEN/examples/cogs/1.js'
  },
  '2' => {
    execute: [Function: execute],
    name: '2',
    path: 'HIDDEN/examples/cogs/2.js'
  }
}*/
```
# ads
My discord bot [Invite Link](https://glow-bot.com/invite)  

# thanks
Cog system was inspired from [discord.py](https://github.com/Rapptz/discord.py)