import { CanActivateFn, NavigationStart, Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  AuthService,
  _isAuthenticated,
  _isRole,
} from '../../services/common/auth.service';
import { CustomToastrService } from '../../services/ui/custom-toastr.service';
import {
  ToastrMessageType,
  ToastrPosition,
} from '../../services/ui/custom-toastr.service';
import { RoleEnums } from '../../models/enums/RoleEnums';
import { TranslateService } from '@ngx-translate/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastrService = inject(CustomToastrService);
  const translateService = inject(TranslateService);
  const authService = inject(AuthService);

  authService.identityCheck();

     let  previousUrl: string | null = null;
  let currentUrl: string | null = router.url;
      router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        previousUrl = currentUrl;
        currentUrl = event.url;
      }
    });

if(!authService.isAuthenticated &&      
    state.url.startsWith('/dashboard')
  ) {
    router.navigate(["/auth/login"])
    toastrService.message(
      translateService.instant('clientErrorMessage.againLogin'),
      translateService.instant('clientErrorMessage.accessDenied'),
      {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      }
    );

    return false;
  }
  if (
    (!authService.isAuthenticated ||
      !(authService.isRole.includes(RoleEnums.SuperAdmin) ||
      authService.isRole.includes(RoleEnums.Admin))) &&
    state.url.startsWith('/dashboard')
  ) {
    toastrService.message(
      translateService.instant('clientErrorMessage.againLogin'),
      translateService.instant('clientErrorMessage.accessDenied'),
      {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      }
    );

    return false;
  } else if (authService.isAuthenticated && state.url.startsWith('/auth')) {
    toastrService.message(
      translateService.instant('clientErrorMessage.againLoginContent'),
      translateService.instant('clientErrorMessage.againLogin'),
      {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      }
    );
    router.navigate([previousUrl]);
    return false;
  }

  return true;
};
