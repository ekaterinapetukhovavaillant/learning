import { FormEvent, useState } from "react";
import FormField from "./FormField";
import { validFormSchema } from "../validation/form-validation";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { config } from "../config";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function validateForm() {
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    try {
      validFormSchema.parse(formData);

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
    mutationFn: (data: typeof formData) =>
      fetch(`${config.backendApiUrl}/user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      }),
    onSuccess: () => {
      navigate("/");
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validateForm()) {
      mutate(formData);
    }
  }

  return (
    <form className="flex flex-col gap-y-6 w-80" onSubmit={submit}>
      <FormField
        label="Name:"
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        errors={errors.name}
      />
      <FormField
        label="Email:"
        id="email"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        errors={errors.email}
      />
      <FormField
        label="Password:"
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        errors={errors.password}
      />
      <button
        type="submit"
        className="bg-black text-white rounded border border-solid border-black px-4 py-2 transition hover:bg-white hover:text-black"
      >
        Sign Up
      </button>
    </form>
  );
}
