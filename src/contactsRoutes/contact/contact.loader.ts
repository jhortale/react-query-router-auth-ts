import { LoaderFunctionArgs } from "react-router-dom";
import { contactQuery } from "./contact.query";
import queryClient from "../../services/queryClient";

export async function contactLoader({ params }: LoaderFunctionArgs) {
  const query = contactQuery(params.contactId || '');
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
}