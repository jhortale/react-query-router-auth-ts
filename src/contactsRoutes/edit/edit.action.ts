import { redirect, ActionFunctionArgs } from "react-router-dom";
import { updateContact } from "../../contacts";
import queryClient from "../../services/queryClient";

export async function editAction ({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  queryClient.invalidateQueries({ queryKey: ["contacts"] });
  return redirect(`/contacts/${params.contactId}`);
}