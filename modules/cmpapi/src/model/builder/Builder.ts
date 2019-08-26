import {
  Return,
} from '../Return';

export interface Builder {

  build: () => Return;
  isBuildable: () => boolean;
};
