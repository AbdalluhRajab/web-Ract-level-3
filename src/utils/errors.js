const messages = {
  401: "Your session is no longer valid. Please sign in again.",
  403: "You do not have permission to perform this action.",
  404: "The requested record could not be found.",
  422: "Some information is invalid. Review the highlighted fields.",
  500: "The service is temporarily unavailable. Please try again.",
};

export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function toUserError(error) {
  if (error?.name === "AbortError") return { type: "info", message: "Request cancelled." };
  if (!error?.status) return { type: "error", message: "Network connection failed. Check your connection and try again." };
  return { type: error.status >= 500 ? "error" : "warning", message: messages[error.status] || error.message || "Something went wrong." };
}
