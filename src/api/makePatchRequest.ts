import { getUserToken } from "../utils/functions/tokenAndUserData";
import appAxios from "./appAxios";

const makePatchRequest = async (
  endpoint: string,
  body: unknown,
  headers = {}
) => {
  const userToken = getUserToken();
  const { data } = await appAxios().patch(endpoint, body, {
    headers: {
      Authorization: userToken ? `Token ${userToken}` : undefined,
      ...headers,
    },
  });
  return data;
};

export default makePatchRequest;
