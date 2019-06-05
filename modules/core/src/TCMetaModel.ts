import {validate, IsInt, IsDate, Min, Max} from 'class-validator';

class TCMetaModel {

  @IsInt()
  @Min(1)
  @Max(63)
  private version: number = 2;

  @IsDate()
  private created: Date;

  @IsDate()
  private lastUpdated: Date;

  // create a FitsBits
  @IsInt()
  @Min(1)
  @Max(63)
  private consentScreen: number;


}

export {TCMetaModel};
