import { FormEvent, useState } from "react";
import FormField from "../common/FormField";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UnauthorizedError } from "../../errors/unauthorized-error";

interface Form<T> {
  fields: T;
  checkValidation: (data: T) => void;
  sendRequest: (data: T) => Promise<unknown>;
  buttonText: string;
}

export default function Form<T extends object>({ fields, checkValidation, sendRequest, buttonText }: Form<T>) {
  const [formData, setFormData] = useState(fields);

  const [errors, setErrors] = useState(fields);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function validateForm() {
    setErrors(fields);

    try {
      checkValidation(formData);

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        err.errors.forEach((zodError) => {
          setErrors((prevError) => ({
            ...prevError,
            [zodError.path[0]]: zodError.message,
          }));
        });
      }
    }
  }

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: typeof formData) => sendRequest(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      if (err instanceof UnauthorizedError) {
        setErrors((prevErrorData) => ({ ...prevErrorData, password: err.message }))
      }
    }
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validateForm()) {
      mutate(formData);
    }
  }

  const formFileds = Object.keys(fields).map(item => {
    const fieldKey = item as keyof T;

    return (
      <FormField
        key={fieldKey.toString()}
        label={item[0].toUpperCase() + item.slice(1)}
        id={item}
        type={item === 'password' ? 'password' : 'text'}
        name={item}
        value={formData[fieldKey] as string}
        onChange={handleChange}
        errors={errors[fieldKey] as string}
      ></FormField>)
  });

  return (
    <form className="flex flex-col gap-y-6 w-80" onSubmit={submit}>
      {formFileds}
      <button
        type="submit"
        className="bg-black text-white rounded border border-solid border-black px-4 py-2 transition hover:bg-white hover:text-black"
      >
        {buttonText}
      </button>
    </form>
  );
}
