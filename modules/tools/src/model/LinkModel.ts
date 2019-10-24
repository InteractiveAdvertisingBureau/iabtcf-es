import {VueConstructor} from 'vue';

export class LinkModel {

  private title: string;
  private link: string;
  private component: VueConstructor;

  public constructor(title: string, component: VueConstructor) {

    this.title = title;
    this.link = title.toLowerCase().replace(' ', '-');
    this.component = component;

  }
  public getTitle(): string {

    return this.title;

  }
  public getLink(): string {

    return this.link;

  }
  public getComponent(): VueConstructor {

    return this.component;

  }

}
