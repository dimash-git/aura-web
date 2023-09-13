import routes from "@/routes";
import { getAuthHeaders } from "../utils";

export interface Payload {
  data: {
    category_id: number;
    left_name: string;
    left_bday: string;
    right_name: string;
    right_bday: string;
  };
  token: string;
}

export interface Response {
  compat: ICompat;
  meta: IMeta;
}

export interface ICompat {
  left_name: string;
  left_bday: string;
  right_name: string;
  right_bday: string;
  body: null | string;
  body_pending: boolean;
  body_check_path: string;
}

export interface IMeta {
  links: {
    self: string;
  };
}

export interface CompatCategory {
  id: number;
  name: string;
}

export const createRequest = ({ token, data }: Payload): Request => {
  const url = new URL(routes.server.compat());
  const body = JSON.stringify({ data });
  return new Request(url, { method: "POST", headers: getAuthHeaders(token), body });
};
