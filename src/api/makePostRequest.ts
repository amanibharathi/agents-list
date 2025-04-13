import { getUserToken } from "../utils/functions/tokenAndUserData";
import appAxios from "./appAxios";

const makePostRequest = async (
  endpoint: string,
  body: unknown,
  headers?: object
) => {
  const userToken = getUserToken();
  const { data } = await appAxios().post(endpoint, body, {
    headers: {
      Authorization: userToken ? `Token ${userToken}` : undefined,
      ...headers,
    },
  });
  return data;
};

export default makePostRequest;