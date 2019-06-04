import {VueConstructor} from 'vue';
class LinkModel {

  private title: string;
  private link: string;
  private component: VueConstructor;

  public constructor(title: string, component: VueConstructor) {

    this.title = title;
    this.link = component.name || '';
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
export {LinkModel};
