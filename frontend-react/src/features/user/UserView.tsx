import { updateUserStore, useUserStore } from "../../store/user-store"

export default function UserView() {
    updateUserStore();

    // const name = userStore.getState().user?.name;

    const user = useUserStore((s) => s.user)

    return (<div>{user?.name}</div>)
}