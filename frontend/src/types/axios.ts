export interface ApiResponse<T> {
  body: T ;
  successDescription: string | null;
  errors: string | null;
  isSuccess: boolean;
}