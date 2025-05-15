import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
import { CustomToastrService } from '../../services/ui/custom-toastr.service';
import { ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';


export const authGuard: CanActivateFn = (route, state) => {
  


 const router = inject(Router);

  const toastrService = inject(CustomToastrService);
  const authService = inject(AuthService);
  
authService.identityCheck()

      if (!authService.isAuthenticated && state.url.startsWith("/dashboard")){
      
    toastrService.message("Please Sign in", "AccessDenied!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  
    // router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return false;
  }else if ((authService.isAuthenticated && state.url.startsWith("/auth"))) {

       toastrService.message("Please firstly Sign out", "AccessDenied!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
        router.navigate(["home"]);
    return false;
  }

  return true;

};
