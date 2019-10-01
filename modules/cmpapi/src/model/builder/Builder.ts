import {
  Return,
} from '../Return';

export interface Builder {

  build: (vendors?: number[]) => Return;
  isBuildable: () => boolean;
};
