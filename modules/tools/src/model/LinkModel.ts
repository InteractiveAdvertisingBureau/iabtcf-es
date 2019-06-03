class LinkModel {

  private title: string;
  private link: string;

  public constructor(title: string, link: string) {

    this.title = title;
    this.link = link;

  }
  public getTitle(): string {

    return this.title;

  }
  public getLink(): string {

    return this.link;

  }

}
export {LinkModel};
