import { getUserToken } from "../utils/functions/tokenAndUserData";
import appAxios from "./appAxios";

const makeDeleteRequest = async (
  endpoint: string,
  params = {},
  headers = {}
) => {
  const userToken = getUserToken();
  const { data } = await appAxios().delete(endpoint, {
    headers: {
      Authorization: userToken ? `Token ${userToken}` : undefined,
      ...headers,
    },
    params: params,
    paramsSerializer: {
      indexes: null, // by default: false
    },
  });
  return data;
};

export default makeDeleteRequest;