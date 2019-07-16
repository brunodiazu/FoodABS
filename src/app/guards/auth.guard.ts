import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable <boolean> | Promise<boolean> |boolean {
      return this.afAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !! authState))
      .pipe(tap(auth => {
        if (!auth) {
          this.router.navigate(['/profile']);
        }
      }));
    }
}
