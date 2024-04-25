import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const jwtGuardGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router)
  const token = localStorage.getItem("jwt");
  if (!token) {
    router.navigate(["/login"])
    return false;
  } else {
    router.navigate(["/home"])
    return true;
  }
};
