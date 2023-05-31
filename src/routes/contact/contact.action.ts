import { ActionFunctionArgs } from "react-router-dom";
import { updateContact } from "../../contacts";
import queryClient from "../../services/queryClient";

export async function contactAction ({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const contact = await updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
  await queryClient.invalidateQueries({ queryKey: ["contacts"] });
  return contact;
}