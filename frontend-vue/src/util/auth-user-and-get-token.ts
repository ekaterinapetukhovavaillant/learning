import { config } from "../config";
import { type ValidLogin } from "../validation/form.validation";
import { savedToken, updateUserStore, userStore } from "../store/user-store";
import { NotFoundError } from "../errors/not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const loginUser = async (data: ValidLogin) => {
  const response = await fetch(`${config.backendApiUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new UnauthorizedError("Email or password is not correct")
    }
  }

  const body = await response.json();

  savedToken.value = body.token;

  // updateUserStore();
};
