import { ApiResponse } from "../types/apiResponse";

export const createResponse = <T>(
  body: T | null,
  successDescription: string | null,
  errors: string | null,
  isSuccess: boolean
): ApiResponse<T> => ({
  body,
  successDescription,
  errors,
  isSuccess,
});