import { useLocalStorage } from "@vueuse/core";
import { computed, reactive } from "vue";
import type { ValidUser } from "../validation/form.validation";
import { config } from "../config";

interface UserStore {
  user: ValidUser | null;
}

export const userStore: UserStore = reactive({
  user: null,
});

export async function updateUserStore() {
  const getMeResponse = await fetch(`${config.backendApiUrl}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${savedToken.value}`,
    },
  });

  if (getMeResponse.ok) {
    const userData = await getMeResponse.json();

    userStore.user = userData;
  }
}

export const savedToken = useLocalStorage("token", null);

export const isAuth = computed(() => savedToken.value);
