// ─── Enums ─────────────────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'member';
export type ProjectType = 'software' | 'business' | 'marketing';
export type ProjectStatus = 'active' | 'archived';

// ─── Entities ──────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string | null;
  type: ProjectType;
  status: ProjectStatus;
  owner: User;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

// ─── API Payloads ───────────────────────────────────────────────────────────────
export interface AuthResponse {
  user: Pick<User, 'id' | 'email' | 'fullName' | 'avatar' | 'role'>;
  accessToken: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateProjectPayload {
  name: string;
  key: string;
  description?: string;
  type?: ProjectType;
  status?: ProjectStatus;
}

export type UpdateProjectPayload = Partial<Omit<CreateProjectPayload, 'key'>>;

// ─── Utils ─────────────────────────────────────────────────────────────────────
export interface ApiError {
  message: string | string[];
  statusCode: number;
  error: string;
}

// Lấy message lỗi từ Axios error để hiển thị toast/alert
export function getApiErrorMessage(error: unknown): string {
  const err = error as { response?: { data?: ApiError } };
  const msg = err?.response?.data?.message;
  if (Array.isArray(msg)) return msg[0];
  return msg ?? 'Có lỗi xảy ra, vui lòng thử lại';
}



// AI Chat/Response types
export interface AiResponse {
  _id: string;
  user: string | User;
  prompt: string;
  response: string;
  contextType?: 'TASK' | 'NOTE' | 'GENERAL';
  contextId?: string;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}


export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

