[@iabtcf/cmpapi - Usage Documentation](README.md) > [CmpApi](cmpapi.md)

# CmpApi

Need a good explanations of this

[CmpApi API Documentation](../api/classes/cmpapi.md)

You will need to use a valid TCModel. See [TCModel Usage](../../../../modules/core/docs/usage/tcmodel.md)



## Create
During construction of the CmpApi, the __tcfapi stub is replaced with CmpApi's own function
for handling __tcfapi command requests. Commands that were waiting to be executed in the stub are
filtered out if not valid. Ping and custom commands are executed and removed from the queue while
all other commands remain queued until a valid TCModel is set.

````javascript
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';

// To create an instance of the CmpApi. Pass in your Cmp ID and the Cmp Version to constructor.
const cmpApi = new CmpApi(1, 3);
````
After creation, __tcfapi can service ping commands and custom commands only. All other commands
will be queue until we have a valid TCModel. So lets create and set one.



## Set TCModel
Create a **valid** [TCModel](../../../../modules/core/docs/usage/tcmodel.md) and set it in CmpApi. The CmpApi doesn't keep the reference to the passed in TCModel, it will create it's own deep copy.

````javascript
// Create a TCModel
const tcModel = new TCModel();

// Set valid TCModel values here. See TCModel Usage link above!

// Set the TCModel.
cmpApi.tcModel = tcModel;
````
After creation, __tcfapi can service ping commands and custom commands only. All other commands
will be queue until we have a valid TCModel. So lets create and set one.


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

## Show UI and Update TCModel
The CmpApi needs to know when you are going to show the user the CMP UI. 

**Note:** You do not have to let CmpApi know when you stop showing the UI as setting the TCModel will handle this.

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


## Typical Scenarios

### Scenario 1: Typical Use - Create, Set, Show and Update TCModel
The basic usage of CmpApi would be to create an instance, set the TCModel, optionally show the CMP UI and update the TCModel.

````javascript
import {CmpApi} from '@iabtcf/cmpapi';
import {TCModel} from '@iabtcf/core';

// To create an instance of the CmpApi. Pass in your Cmp ID and the Cmp Version to constructor.
const cmpApi = new CmpApi(1, 3);

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

// Set valid TCModel values. See TCModel Usage link above!

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


