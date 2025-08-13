import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';

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
        exposedModule: './sige2Mfe',
      }).then(m => m.RemoteEntryModule)
  },
];
