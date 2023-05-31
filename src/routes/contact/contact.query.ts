import { getContact } from "../../contacts";

export function contactQuery (id: string) {
  return ({
    queryKey: ["contacts", "detail", id],
    queryFn: async () => {
      const contact = await getContact(id);
      if (!contact) {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      }
      return contact;
    },
  })
}