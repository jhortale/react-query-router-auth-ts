import { getContacts } from "../../contacts";

export const contactListQuery = (q: string) => ({
  queryKey: ["contacts", "list", q || "all"],
  queryFn: () => getContacts(q),
});