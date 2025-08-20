import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'componenteRemoto',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:6301/remoteEntry.js',
        exposedModule: './Component'
      }).then(m => m.AppComponent)
  },
  {
    path: 'moduloRemoto',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:6301/remoteEntry.js',
        exposedModule: './Module',
      }).then(m => m.RemoteEntryModule)
  },
  {
    path: 'moduloRemotoProtegido',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:6301/remoteEntry.js',
        exposedModule: './Module',
      }).then(m => m.RemoteEntryModule)
  },
];
