export class ClientTools {
  static getQueryParams() {
    return new URLSearchParams(window.location.search);
  }

  static setQueryParam(param: string, value: string) {
    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set(param, value);
      window.location.search = searchParams.toString();
    }
  }

  static getPrefferedLanguage() {
    const availableLangs = ['de', 'en', 'ru', 'ua'];
    let navigatorLanguage = navigator.language.slice(0, 2);
    navigatorLanguage = navigatorLanguage !== 'uk' ? navigatorLanguage : 'ua';

    let queryLanguage = this.getQueryParams().get('lang');

    let lang = queryLanguage ?? navigatorLanguage;

    return availableLangs.includes(lang) ? lang : 'en';
  }
}
