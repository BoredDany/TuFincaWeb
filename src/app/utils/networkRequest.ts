import axios from "axios";

export function buildRequest<T>(
  url: string,
  method: "get" | "post" | "put" | "delete",
  auth?: string,
  data?: T
  ) : Promise<void | T> | Promise<T[]> {
  return axios<T>({
    url,
    method,
    data,
    headers: {
      'Authorization': auth,
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(res => res.data)
    .catch(error => console.log(error));
}
