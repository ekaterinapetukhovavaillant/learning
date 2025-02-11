import Title from "../common/Title";
import LinkTo from "../common/LinkTo";
import UserView from "../user/UserView";
import { useTokenStore } from "../../store/user-store";

export default function IndexView() {
  // const isAuth = tokenStore.getState().isAuth;

  const isAuth = !!useTokenStore((s) => s.token);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Hello to YourWallet" />
      {isAuth ?
        <UserView></UserView>
        : <div className="py-8 flex flex-col gap-y-4 items-center">
          <LinkTo name="registration"></LinkTo>
          <LinkTo name="login"></LinkTo>
        </div>
      }
    </div>
  );
}
