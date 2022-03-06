export type ErrorResponse = {
  message: string;
};

export function errorResponse(message: string): ErrorResponse {
  return { message };
}
