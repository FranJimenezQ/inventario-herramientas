
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/auth/auth.selectors';
import { take, map } from 'rxjs/operators';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectToken).pipe(
    take(1),
    map(token => {
      if (token) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
