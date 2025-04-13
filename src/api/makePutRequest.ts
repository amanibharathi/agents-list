import { getUserToken } from "../utils/functions/tokenAndUserData";
import appAxios from "./appAxios";

const makePutRequest = async (endpoint: string, body: unknown) => {
  const userToken = getUserToken();
  const { data } = await appAxios().put(endpoint, body, {
    headers: {
      Authorization: userToken ? `Token ${userToken}` : undefined,
    },
  });
  return data;
};

export default makePutRequest;