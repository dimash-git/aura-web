import { getAuthHeaders } from "../utils";

export interface Payload {
  body_check_path: string;
  token: string;
}

export interface Response {
  ai_request: IAiRequest;
}

export interface IAiRequest {
  id: string;
  prompt_key: string;
  created_at: string;
  updated_at: string;
  state: string;
  is_reused: boolean;
  finished_at: string;
  job_id: null;
  response: IAiResponse;
}

export interface IAiResponse {
  id: string;
  inputs: IAiInputs;
  created_at: string;
  updated_at: string;
  body: string;
}

export interface IAiInputs {
  left_name: string;
  right_name: string;
  stat_value: number;
  stat_energy: string;
  category_name: string;
  left_bdayIso8601: string;
  right_bdayIso8601: string;
}

export const createRequest = ({ body_check_path, token }: Payload): Request => {
  const url = new URL(`https://aura.wit.life${body_check_path}`);
  return new Request(url, { method: "GET", headers: getAuthHeaders(token) });
};
