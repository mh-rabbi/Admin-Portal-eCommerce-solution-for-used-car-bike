import { apiService } from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

class UsersService {
  async getAllUsers(): Promise<User[]> {
    return apiService.get<User[]>('/admin/users');
  }

  async getUserById(id: number): Promise<User> {
    return apiService.get<User>(`/admin/users/${id}`);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`/admin/users/${id}`);
  }
}

export const usersService = new UsersService();
