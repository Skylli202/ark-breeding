import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { formSchema } from "./schema";
import { dev } from '$app/environment';

export const load: PageServerLoad = async () => {
  if (dev) {
    return { form: await superValidate({ email: "test@example.com", password: "qwerqwerqwer" }, zod(formSchema)) }
  }

  return {
    form: await superValidate(zod(formSchema))
  }
}
