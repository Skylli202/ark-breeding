import { setError, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { signUpSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import { auth } from "$lib/auth";
import { APIError } from "better-auth/api";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate({ name: "sky", email: "test@example.com", password: "qwerqwerqwer" }, zod(signUpSchema),)
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(signUpSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      const { headers, response } = await auth.api.signUpEmail({
        headers: event.request.headers,
        returnHeaders: true,
        body: {
          ...form.data,
        }
      })
      console.log(`headers: ${headers}`)
      console.log(`response: ${response}`)

      for (let cookie of headers.getSetCookie()) {
        console.log(cookie)
      }

      return { form, response }
    } catch (error) {
      if (error instanceof APIError) {
        console.log(error.message, error.status)
        setError(form, error.message)
        return fail(400, { form })
      }
    }
  }
}
