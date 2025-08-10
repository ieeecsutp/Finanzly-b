export type ApiStatus = "success" | "error";

export interface ApiResponse<T> {
  status: ApiStatus;
  message: string;
  data?: T;
  error?: ApiFieldError[];
}

export interface ApiFieldError {
  field: string; 
  message: string;
}