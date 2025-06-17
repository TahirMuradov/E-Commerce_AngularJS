import { Injectable ,PLATFORM_ID, Inject} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  setCookie(name: string, value: string, days: number): void {
    debugger
    if (isPlatformBrowser(this.platformId)) {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      this.cookieService.set(name, value, expires);
    }
  }

  getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get(name);
    }
    return null;
  }

  deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.delete(name);
    }
  }
}
