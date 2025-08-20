export const environment = {
  production: false,
  keycloakBaseUrl: 'http://172.20.68.90',
  apiBase: 'http://172.20.68.90:9191',
  logout: `http://172.20.68.90/auth/realms/iol-caba/protocol/openid-connect/logout?redirect_uri=${document.location.protocol + '//' + document.location.hostname + ':6300'}`,
  apiKey: 'AIzaSyBhsKQQhToVeFK68Ps1G8pSx16nfxTJqzc',
  keycloakRealm: 'iol-caba',
  keycloakClientId: 'electoral-ui',
};

export const actions = {
  edit: 'edit',
  create: 'create',
  delete: 'delete',
  save: 'save',
  designar: 'designar',
};
