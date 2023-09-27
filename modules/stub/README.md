[![NPM version](https://img.shields.io/npm/v/@cookiehub/iabtcf-stub.svg?style=flat-square)](https://www.npmjs.com/package/@cookiehub/iabtcf-stub)
[![npm module downloads per month](http://img.shields.io/npm/dm/@cookiehub/iabtcf-stub.svg?style=flat)](https://www.npmjs.org/package/@cookiehub/iabtcf-stub)
[![InteractiveAdvertisingBureau](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es.svg?style=shield)](https://circleci.com/gh/InteractiveAdvertisingBureau/iabtcf-es)

# @cookiehub/iabtcf-stub

Cmp API Stub code.  Maybe included in commonjs loader or dropped directly on the page.

#### Installation

npm
```
npm install @cookiehub/iabtcf-stub
```

yarn
```
yarn add @cookiehub/iabtcf-stub
```
#### Using

##### include via module loading
```javascript
import * as cmpstub from '@cookiehub/iabtcf-stub';
```
or

```javascript
const cmpstub = require('@cookiehub/iabtcf-stub');
```

then execute:

```javascript
cmpstub();
```
this should generate the `__tcfapi()` window function with the queing functionality.

##### to drop on a page
```
git clone https://github.com/InteractiveAdvertisingBureau/iabtcf-es.git

cd iabtcf-es/modules/stub/

yarn // or npm install

yarn build // or npm run build
```

Built stub will be output to ./lib

##### Getting queue of commands

```javascript
const queue = __tcfapi();
console.log(queue); // [ ['command', 2, callback], ...]
```
