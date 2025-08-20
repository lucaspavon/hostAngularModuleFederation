// src/app/mocks/keycloak.service.mock.ts
import { Injectable } from '@angular/core';

@Injectable()
export class MockKeycloakService {
  private _authenticated = false;

  async init(_: any): Promise<boolean> {
    this._authenticated = true; // simulamos sesión iniciada
    return true;
  }

  async login(options?: { redirectUri?: string }): Promise<void> {
    console.log('🔑 Mock login ejecutado', options);
    this._authenticated = true;
  }

  async logout(): Promise<void> {
    console.log('🚪 Mock logout ejecutado');
    this._authenticated = false;
  }

  async isLoggedIn(): Promise<boolean> {
    return this._authenticated;
  }

  async getToken(): Promise<string> {
    return 'mock-token-123456';
  }

  isUserInRole(role: string): boolean {
    return role === 'admin'; // simulamos rol
  }

  getUsername(): string {
    return 'mock-user';
  }

  getUserRoles(allRoles: boolean = true): string[] {
    // Devolvemos roles de prueba
    return ['user', 'admin'];
  }
}
