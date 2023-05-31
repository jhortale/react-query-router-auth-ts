import { LoaderFunctionArgs } from "react-router-dom";
import queryClient from '../../services/queryClient'
import { contactListQuery } from "./root.query";

export async function rootLoader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    if (q && !queryClient.getQueryData(contactListQuery(q).queryKey)) {
      await queryClient.fetchQuery(contactListQuery(q));
    }
    return { q };
  }