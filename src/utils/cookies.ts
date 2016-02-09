/*
https://developer.mozilla.org/ja/docs/Web/API/Document/cookie
*/

export default class Cookies {
  public static getItem(key: string): string {
    if (!key || !this.hasItem(key)) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  }
  public static setItem(key, value, expireSeconds?, path?, domain?, secureMode?): void {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) { return; }
    var expireString = "";
    if (expireSeconds) {
      switch (expireSeconds.constructor) {
        case Number:
          expireString = expireSeconds === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + expireSeconds;
          break;
        case String:
          expireString = "; expires=" + expireSeconds;
          break;
        case Date:
          expireString = "; expires=" + expireSeconds.toGMTString();
          break;
      }
    }
    document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expireString + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secureMode ? "; secure" : "");
  }
  public static removeItem(key, path?): void {
    if (!key || !this.hasItem(key)) { return; }
    document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (path ? "; path=" + path : "");

  }
  public static hasItem(key): boolean {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }
  public static keys(): string[] {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
}
