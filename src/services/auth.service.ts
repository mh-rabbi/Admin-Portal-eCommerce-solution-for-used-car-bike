import { apiService } from './api';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: AdminUser;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    // CRITICAL FIX: Trim inputs to prevent whitespace issues
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      throw new Error('Email and password are required');
    }

    const response = await apiService.post<LoginResponse>(
      '/auth/login',
      { email: trimmedEmail, password: trimmedPassword },
      false
    );

    // CRITICAL FIX: Trim token before storing to prevent signature issues
    if (response.access_token) {
      const cleanToken = response.access_token.trim();
      localStorage.setItem('admin_token', cleanToken);
      localStorage.setItem('admin_user', JSON.stringify(response.user));
      console.log('✅ Token stored successfully (length:', cleanToken.length, ')');
    }

    return response;
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  }

  getCurrentUser(): AdminUser | null {
    const userStr = localStorage.getItem('admin_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('admin_token');
    // CRITICAL FIX: Trim token when retrieving to prevent signature issues
    return token ? token.trim() : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}

export const authService = new AuthService();

