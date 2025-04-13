import Cookies from "js-cookie";

const cookieAge = 30;

const setTokenAndUserData = ({
  token,
  userData,
}: {
  token: string;
  userData: unknown;
}) => {
  Cookies.set("token", token, { expires: cookieAge });
  Cookies.set("user_data", JSON.stringify(userData), { expires: cookieAge });
};

const getUserToken = () => {
  return Cookies.get("token") || null;
};

export const setUserToken = (token: string) => {
  Cookies.set("token", token, { expires: cookieAge });
};

const getUserData = () => {
  const userData = Cookies.get("user_data");
  return userData ? JSON.parse(userData) : null;
};

const clearTokenAndUserData = () => {
  Cookies.remove("token");
  Cookies.remove("user_data");
};

const dummyOptions = [
  {
    label: "Opt1",
    value: "option 1",
  },
  {
    label: "Opt2",
    value: "option 2",
  },
  {
    label: "Opt3",
    value: "option 3",
  },
  {
    label: "Opt4",
    value: "option 4",
  },
];

export {
  setTokenAndUserData,
  clearTokenAndUserData,
  getUserToken,
  getUserData,
  dummyOptions,
};
