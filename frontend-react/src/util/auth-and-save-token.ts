import { config } from "../config";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { ValidLogin } from "../validation/form-validation";

type LoginResponse = {
    token: string,
}

export const authAndStoreToken = async (data: ValidLogin) => {
    const response = await fetch(`${config.backendApiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new UnauthorizedError("Email or password is not correct");
        }
    };

    const body: LoginResponse = await response.json();

    return body.token;
}