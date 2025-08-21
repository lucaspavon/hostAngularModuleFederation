import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { MockKeycloakService } from './mocks/keycloack.service.mock';
import { environment } from './enviroment/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

// CONFIGURACION PARA EL HOST CON EL SERVICIO MOCKEADO
function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init({});
}

// CONFIGURACION PARA EL HOST CON EL SERVICIO ORIGINAL
/* function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: {
          url: `${environment.keycloakBaseUrl}/auth`,
          realm: `${environment.keycloakRealm}`,
          clientId: `${environment.keycloakClientId}`,
        },

        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        },
        bearerExcludedUrls: ['/assets/', '/*'],
      })
      .then(async (authenticated) => {
        console.log('Hasta acá está llegando')
        if (authenticated) {
          try {
            // const [accessToken, userProfile] = await Promise.all([keycloak.getToken(), keycloak.loadUserProfile()]);
            // const data = {
            //   accessToken,
            //   idToken: keycloak.getKeycloakInstance().idToken,
            //   refreshToken: keycloak.getKeycloakInstance().refreshToken,
            //   userProfile,
            //   username: keycloak.getUsername(),
            //   roles: keycloak.getUserRoles(),
            //   tokenParsed: keycloak.getKeycloakInstance().tokenParsed,
            //   profile: keycloak.getKeycloakInstance().profile,
            //   idTokenParsed: keycloak.getKeycloakInstance().idTokenParsed,
            // };

            // interface DecodedToken {
            //   preferred_username: string;
            //   given_name: string;
            //   family_name: string;
            //   email: string;
            //   sub: string;
            //   exp: number;
            // }

            // const decodedToken: DecodedToken = jwtDecode(data.accessToken) as DecodedToken;

            // const cuitCuilt = decodedToken.preferred_username;

            // const user = {
            //   cuitCuilt: cuitCuilt,
            //   nombre: decodedToken.given_name,
            //   apellido: decodedToken.family_name,
            //   email: decodedToken.email,
            //   roles: data.roles,
            //   id: decodedToken.sub,
            // };
            // const roles = data.roles;

            // if (currentTime < decodedToken.exp) {
            //   localStorage.setItem('username', JSON.stringify({ status: true, accessToken: data.accessToken, user, roles }));
            // } else {
            //   window.location.href = environment.logout;

            //   window.localStorage.clear();

            //   document.cookie.split(';').forEach(function (cookie) {
            //     const eqPos = cookie.indexOf('=');
            //     const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            //     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            //   });

            //   document.cookie.split(';').forEach(function (cookie_1) {
            //     const eqPos_1 = cookie_1.indexOf('=');
            //     const name_1 = eqPos_1 > -1 ? cookie_1.substr(0, eqPos_1).trim() : cookie_1.trim();
            //     document.cookie = name_1 + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + location.hostname;
            //   });

            // }
            return console.log('El usuario esta authenticado');
          } catch (error) {
            console.error('Error al obtener datos de Keycloak', error);
            return null;
          }
        } else {
          throw new Error('Keycloak authentication failed');
        }
      })
      .catch(() => {
        return null;
      });
} */

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService], // 👈 el guard depende de KeycloakService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    {
      provide: KeycloakService, // 👈 cada vez que pidan KeycloakService...
      useClass: MockKeycloakService, // ...inyectamos nuestro mock
    },
  ],
};


// CONFIGURACION PARA EL HOST CON EL SERVICIO ORIGINAL
/*     {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    KeycloakService, */

// CONFIGURACION PARA EL HOST CON EL SERVICIO MOCKEADO
    /* {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService], // 👈 el guard depende de KeycloakService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    {
      provide: KeycloakService, // 👈 cada vez que pidan KeycloakService...
      useClass: MockKeycloakService, // ...inyectamos nuestro mock
    }, */

