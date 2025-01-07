import RegistrationForm from "../components/RegistrationForm";
import Title from "../components/Title";

export default function RegistrationView() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Registration"/>
      <RegistrationForm />
    </div>
  );
}
