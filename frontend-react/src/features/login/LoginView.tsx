import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../util/auth-and-save-token";
import { ValidLogin, validLoginSchema } from "../../validation/form-validation";
import Form from "../common/Form";
import Title from "../common/Title";

export default function LoginView() {
  const login = useTokenStore((s) => s.login);

  const submit = async (data: ValidLogin) => {
    const token = await authAndStoreToken(data);
    login(token);
  }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Login" />
      <Form<ValidLogin>
        buttonText="Sign In"
        fields={{ email: "", password: "" }}
        checkValidation={validLoginSchema.parse}
        sendRequest={submit}
      ></Form>
    </div>
  )
}