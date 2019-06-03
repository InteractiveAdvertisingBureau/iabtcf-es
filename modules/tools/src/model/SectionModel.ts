import {LinkModel} from './LinkModel';

class SectionModel extends Map {

  public constructor() {

    super();

    this.init();

  }
  private init(): void {

    const encoder: LinkModel = new LinkModel('Encode', 'TCStringEncode');
    const decoder: LinkModel = new LinkModel('Decode', 'TCStringDecode');

    this.set('TCString', [encoder, decoder]);

    const create: LinkModel = new LinkModel('Create Sample', 'GVLCreate');
    const view: LinkModel = new LinkModel('View GVL', 'GVLView');

    this.set('GVL', [create, view]);

  }

}

export {SectionModel};
