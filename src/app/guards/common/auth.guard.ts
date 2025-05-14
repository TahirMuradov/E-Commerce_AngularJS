import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
import { CustomToastrService } from '../../services/ui/custom-toastr.service';
import { ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';

export const authGuard: CanActivateFn = (route, state) => {

 const router = inject(Router);
  const toastrService = inject(CustomToastrService);
  const authService = inject(AuthService);
  authService.signIn("emilys",'emilyspass')
     if (!authService.isAuthenticated) {
    toastrService.message("Please Sign in", "AccessDenied!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });

    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;

};
