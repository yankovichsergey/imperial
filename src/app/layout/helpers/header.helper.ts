export class HeaderHelper {

  public static mouseDownDocumentInit(hamburger: any, event: any): void {
    const menuHolder = event.target.closest('.menu-holder');
    let menuNode = null;
    if (menuHolder) {
      menuNode = menuHolder.querySelector('input');
    }
    let hamburgerAsParent = null;
    const nav = event.target.closest('.nav');
    if (nav) {
      hamburgerAsParent = nav.querySelector('#hamburger') as HTMLElement;
    }
    if (!menuNode && !hamburgerAsParent) {
      hamburger.checked = false;
    }
  }

  public static keyUpDocumentInit(hamburger: any, event: any): void {
    const keyCode = event.keyCode;
    if (keyCode === 27) {
      hamburger.checked = false;
    }
  }
}
