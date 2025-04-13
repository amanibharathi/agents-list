import useAppStore from "../../store/store";
import { setTokenAndUserData } from "../functions/tokenAndUserData";

const useHandleUserData = () => {
  //@ts-expect-error ignore
  const { setUserDataAndTokenInStore } = useAppStore();

  const setTokenAndUserDataInCookiesAndZustand = ({
    token,
    userData,
  }: {
    token: string;
    userData: unknown;
  }) => {
    setTokenAndUserData({ token, userData });
    setUserDataAndTokenInStore({ token, userData });
  };
  return { setTokenAndUserDataInCookiesAndZustand };
};

export default useHandleUserData;
