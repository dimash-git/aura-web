import routes from "@/routes";
import { getBaseHeaders } from "../utils";

export interface Payload {
  locale: string;
}

export interface Response {
  compat_categories: CompatCategory[]
}

export interface CompatCategory {
  id: number
  name: string
}

export const createRequest = ({ locale }: Payload): Request => {
  const url = new URL(routes.server.compatCategories());
  const query = new URLSearchParams({ locale });

  url.search = query.toString();

  return new Request(url, { method: "GET", headers: getBaseHeaders() });
};
