export interface ApiResponse<T = unknown> {
  body: T | null;
  successDescription: string | null;
  errors: string | null;
  isSuccess: boolean;
}