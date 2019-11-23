[![NPM version](https://img.shields.io/npm/v/@iabtcf/cmpapi.svg?style=flat-square)](https://www.npmjs.com/package/@iabtcf/cmpapi)
[![npm module downloads per month](http://img.shields.io/npm/dm/@iabtcf/cmpapi.svg?style=flat)](https://www.npmjs.org/package/@iabtcf/cmpapi)
[![Build](https://travis-ci.org/chrispaterson/iabtcf.svg?branch=master)](https://travis-ci.org/chrispaterson/iabtcf)
[![Coverage Status](https://coveralls.io/repos/github/chrispaterson/iabtcf/badge.svg?branch=master)](https://coveralls.io/github/chrispaterson/iabtcf?branch=master)

# @iabtcf/cmpapi

Ensures other in-page digital marketing technologies have access to CMP transparency and consent information for the [IAB's Transparency and Consent Framework (TCF)](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework).




# CmpApi

CmpApi is the only class needed to provide in-page digital marketing technologies access to a CMP transparency and consent information.
The process involves setting the state of a few properties and/or a valid [TCModel](../../modules/core/readme.md#tcmodel).
 * [API Documentation](docs/api/README.md#iabtcfcmpapi---api-documentation)



## Create CmpApi

````javascript
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';

// To create an instance of the CmpApi. Pass in your Cmp ID and the Cmp Version to constructor. Custom commands are optional.
const cmpApi = new CmpApi(1, 3);
````

During construction of the CmpApi, the __tcfapi stub is replaced with CmpApi's own function
for handling __tcfapi command requests. Commands that were waiting to be executed in the stub are
filtered out if not valid. Ping and custom commands are executed and removed from the queue while
all other commands remain queued until a valid [TCModel](../../modules/core/readme.md#tcmodel) is set.

**Note:** After creation, __tcfapi can service ping commands and custom commands only. All other commands
will be queue until we have a valid TCModel. So lets create and set one.




## Set TCModel
Create a **valid** [TCModel](../../modules/core/readme.md#tcmodel) and set it in CmpApi. The CmpApi doesn't keep the reference to the passed in TCModel, it will create it's own deep copy.

````javascript
// Create a TCModel
const tcModel = new TCModel();

// Set valid TCModel values here. See TCModel Usage link above!

// Set the TCModel.
cmpApi.tcModel = tcModel;
````
After creation, __tcfapi can service ping commands and custom commands only. All other commands
will be queue until we have a valid TCModel. So lets create and set one.



## Show UI and Update TCModel
The CmpApi needs to know when you are going to show the user the CMP UI. 

**Note:** You do not have to let CmpApi know when you stop showing the UI as setting the [TCModel](../../modules/core/readme.md#tcmodel) will handle this.

````javascript
// Set uiVisible to true. No need to set it to false afterward.
cmpApi.uiVisible = true;

// ... User makes selections and we update TCModel

cmpApi.tcModel = tcModel;
````


## GDPR doesn't apply
In the case that GDPR does not apply, simply set the TCModel to null. That's all.

````javascript
cmpApi.tcModel = null;
````


## UI Options: uiVisible

There are two scenarios in which you would set uiVisible. One for true and one for false.

#### False - If TCData is current and does not need renewal
If TCData is current and does not need renewal, then we will not show the ui.
````javascript
cmpApi.uiVisible = false;
````

#### True - If TCData is **not** current and we are about to show the CMP UI

````javascript
cmpApi.uiVisible = true;
````

## Custom Commands
The [Constructor](docs/api/classes/cmpapi.md#constructor) for CmpApi has an optional parameter to pass in your array of custom commands.
CmpApi will not perform any validation custom commands. The CMP is responsible for handling validations and errors. Custom function signatures
must have parameters (version, callback, param). What the CMP does with the parameters passed to it is for the CMP to decide.

##### Custom Command Array Definition
````javascript
{command: string, customFunction: (version, callback, param) => void}[]
````

### Example
##### - CMP SIDE
````javascript
//File: MyCustomCommands.ts

  export const MyCustomCommands = [
    {command: 'bingo', customFunction: (version, callback, param) => {
      // should validate param is a string
      callback(`There was a farmer who had a dog, and ${param} was his name-o`, true);
    }},
    {command: 'wheelsOnTheBus', customFunction: (version, callback, param) => {
      // should validate param is an object {thing: string, sound: string}
      callback(`The ${param.thing} on the bus goes ${param.sound} ${param.sound} ${param.sound}!`, true);
    }},
  ];
````
````javascript
// MyCmp.ts
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';
import {MyCustomCommands} from './MyCustomCommands';

const cmpApi = new CmpApi(1, 3, MyCustomCommands);
...
````
##### - PAGE SCRIPT SIDE
````javascript
// AdScript.ts
const songLyricCallback = (lyrics, success) => {

  if(success) {

    console.log(lyrics)

  } else {

    console.error('Error: could not get song lyrics')

  }

}
__tcfapi('bingo', 2, songLyricCallback, 'Bingo'); 
// Console Output: There was a farmer who had a dog, and Bingo was his name-o
__tcfapi('wheelsOnTheBus', 2, songLyricCallback, {thing: 'Doggy', sound: 'bark'}); 
// Console Output: The Doggy on the bus goes bark bark bark!
...
````

## CmpApi Examples

### Example 1: Typical Use - Create, Set, Show and Update TCModel
The basic usage of CmpApi would be to create an instance, set the [TCModel](../../modules/core/readme.md#tcmodel), optionally show the CMP UI and update the TCModel.

````javascript
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';
import {MyCustomCommands} from './MyCustomCommands';

// To create an instance of the CmpApi. Pass in your Cmp ID, Cmp Version and optional custom commands to constructor.
const cmpApi = new CmpApi(1, 3, MyCustomCommands);

/**
 * During initialization of the CmpApi, the __tcfapi stub is replaced with CmpApi's own function
 * for handling __tcfapi command requests. All commands that were waiting to be executed in the stub are
 * filtered out if not valid. If any commands are able to executed at this point, they are.
 * For example, if their is a ping command in the queue, it will be executed immediately and
 * removed from the queue, while getTcData command requests will not.
 * 
 * At this point, __tcfapi can serve ping commands and custom commands only. All other commands
 * will be queue until we have a valid TCModel. So lets create and set one.
 */

// Create a TCModel
const tcModel = new TCModel();

// Set valid TCModel values. See TCModel link above!

// Set the TCModel. Note: the CmpApi doesn't keep a reference, it will create it's own deep copy.
cmpApi.tcModel = tcModel;

/**
* With a valid TCModel set, Any queued __tcfapi page request commands will be executed and the queue 
* will be cleared. All event listeners will be evoked (and every time you set a new TCModel). 
* All __tcfapi page requests from this point on will be executed immediately without queuing.
* 
* Now, optionally, we may want to show the CMP UI to the user to make selections.
*/

// Set uiVisible to true. No need to set it to false afterward.
cmpApi.uiVisible = true;

// ... User makes selections and we update TCModel

cmpApi.tcModel = tcModel;

// Done
````



### Example 2: TCData is current and does not need renewal

````javascript
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';

// To create an instance of the CmpApi. Pass in your Cmp ID and the Cmp Version to constructor.
const cmpApi = new CmpApi(1, 3);

// Create a TCModel
const tcModel = new TCModel();

// Set the TCModel. Must be a valid TCModel.
cmpApi.tcModel = tcModel;

// We are not going to show the ui.
cmpApi.uiVisible = false;

// Done
````

### Example 3: GDPR doesn't apply

````javascript
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';

// To create an instance of the CmpApi. Pass in your Cmp ID and the Cmp Version to constructor.
const cmpApi = new CmpApi(1, 3);

cmpApi.gdprApplies = false;

// Done
````


