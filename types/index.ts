// User types
export interface User {
   _id: string;
   username: string;
   email: string;
   phone?: string;
   address?: string;
   image?: string;
   role: string;
   accountType?: string;
   isActive: boolean;
   codeId?: string;
   codeExpired?: Date;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateUserDto {
   username: string;
   email: string;
   password: string;
   phone?: string;
   address?: string;
   role?: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
   _id: string;
}

// Auth types
export interface LoginCredentials {
   email: string;
   password: string;
}

export interface RegisterCredentials {
   username: string;
   email: string;
   password: string;
   phone?: string;
   address?: string;
}

export interface AuthResponse {
   user: User;
   access_token: string;
}

// Task types
export interface Task {
   _id: string;
   user: string | User;
   title: string;
   description?: string;
   status: 'TODO' | 'IN_PROGRESS' | 'DONE';
   priority: 'LOW' | 'MEDIUM' | 'HIGH';
   dueDate?: Date;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateTaskDto {
   title: string;
   description?: string;
   status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
   priority?: 'LOW' | 'MEDIUM' | 'HIGH';
   dueDate?: Date;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;

// Note types
export interface Note {
   _id: string;
   user: string | User;
   title: string;
   content: string;
   tags?: string[];
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateNoteDto {
   title: string;
   content: string;
   tags?: string[];
}

export type UpdateNoteDto = Partial<CreateNoteDto>;

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

export interface CreateAiPromptDto {
   prompt: string;
   contextType?: 'TASK' | 'NOTE' | 'GENERAL';
   contextId?: string;
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

// Common types
export interface SelectOption {
   label: string;
   value: string | number;
}

export interface User {
   id: string;
   name: string;
   email: string;
   avatar?: string;
   createdAt: Date;
}

export interface NavItem {
   label: string;
   href: string;
   disabled?: boolean;
   external?: boolean;
}

export interface Feature {
   icon: React.ReactNode;
   title: string;
   description: string;
}
