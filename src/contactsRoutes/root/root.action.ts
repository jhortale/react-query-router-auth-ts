import { redirect } from "react-router-dom";
import { createContact } from "../../contacts";
import queryClient from "../../services/queryClient";

export async function rootAction () {
  const contact = await createContact();
  queryClient.invalidateQueries({ queryKey: ["contacts", "list"] });
  return redirect(`/contacts/${contact.id}/edit`);
}