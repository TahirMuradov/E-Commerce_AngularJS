import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  AuthService,
  _isAuthenticated,
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

  if (
    (!authService.isAuthenticated || authService.isRole == RoleEnums.User) &&
    state.url.startsWith('/dashboard')
  ) {
    toastrService.message(
      translateService.instant('clientErrorMessage.accessDeniedContent'),
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
    router.navigate(['home']);
    return false;
  }

  return true;
};
