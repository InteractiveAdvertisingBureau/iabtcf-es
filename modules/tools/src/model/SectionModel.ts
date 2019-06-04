import {RouteConfig} from 'vue-router';
import Landing from '../components/pages/Landing.vue';
import TCStringEncode from '../components/pages/TCStringEncode.vue';
import {LinkModel} from '../model/LinkModel';

class SectionModel extends Map {

  public constructor() {

    super();

    this.init();

  }
  private init(): void {

    const encoder: LinkModel = new LinkModel('Encode', TCStringEncode);

    this.set('TCString', [encoder]);

  }

  public getRouteConfig(): RouteConfig[] {

    const routes: RouteConfig[] = [
      {path: '/', name: 'home', component: Landing},
    ];

    this.forEach((links: LinkModel[]): void => {

      links.forEach((link: LinkModel): void => {

        routes.push({
          path: '/'+link.getLink(),
          name: link.getLink(),
          component: link.getComponent(),
        });

      });

    });

    return routes;

  }

}

export {SectionModel};
