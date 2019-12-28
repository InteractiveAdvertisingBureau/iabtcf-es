import {EventListenerQueue} from '../src/EventListenerQueue';
import {CmpApiModel} from '../src/CmpApiModel';

beforeEach((): void => {

  EventListenerQueue.clear();
  CmpApiModel.reset();

});
