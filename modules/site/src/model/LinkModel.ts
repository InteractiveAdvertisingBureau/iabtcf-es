import {VueConstructor} from 'vue';

export class LinkModel {

  public title: string;
  public path: string;
  public component: VueConstructor;

  public constructor(title: string, component: VueConstructor) {

    this.title = title;
    this.path = title.toLowerCase().replace(' ', '-');
    this.component = component;

  }

}
