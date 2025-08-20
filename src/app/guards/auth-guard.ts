import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(
    protected readonly _router: Router,
    protected readonly _keycloak: KeycloakService,
  ) {
    super(_router, _keycloak);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authenticated) {
      await this._keycloak.login({
        redirectUri: `${window.location.origin}${state.url}`,
      });
      console.log(`${window.location.origin}${state.url}`);
    }
    console.log(`esta autenticado: ${this.authenticated}`);
    return this.authenticated;
  }
}
