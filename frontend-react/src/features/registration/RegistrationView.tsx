import Title from "../common/Title";
import Form from "../common/Form";
import { ValidRegistration, validRegistrationSchema } from "../../validation/form-validation";
import { config } from "../../config";

export default function RegistrationView() {
  const sendRequest = async (data: ValidRegistration) => {
    fetch(`${config.backendApiUrl}/user`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
        }
      )
    }

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Registration"/>
      <Form<ValidRegistration> 
        buttonText="Sign Up" 
        fields={ {name: "", email: "", password: ""} } 
        checkValidation={validRegistrationSchema.parse}
        sendRequest={sendRequest}
      ></Form>
    </div>
  );
}
