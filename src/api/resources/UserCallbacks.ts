import routes from "@/routes";
import { getAuthHeaders } from "../utils";

export interface PayloadGet {
  id: string;
  token: string;
}

export interface PayloadPost {
  data: {
    user_callback: {
      kind: string;
    };
  };
  token: string;
}

export interface Response {
  user_callback: IUserCallbacks;
}

export interface IUserCallbacks {
  id: string;
  user_id: number;
  kind: string;
  created_at: string;
  updated_at: string;
  prev_stat_changes: IPrevStateChanges[];
  description: string;
  is_complete: boolean;
}

export interface IPrevStateChanges {
  stat: string;
  value: number;
  label: string;
}

export const createRequestPost = ({ data, token }: PayloadPost): Request => {
  const url = new URL(routes.server.createUserCallbacks());
  const body = JSON.stringify(data);
  return new Request(url, { method: "POST", headers: getAuthHeaders(token), body });
};

export const createRequestGet = ({ id, token }: PayloadGet): Request => {
  const url = new URL(routes.server.getUserCallbacks(id));
  return new Request(url, { method: "GET", headers: getAuthHeaders(token) });
};
