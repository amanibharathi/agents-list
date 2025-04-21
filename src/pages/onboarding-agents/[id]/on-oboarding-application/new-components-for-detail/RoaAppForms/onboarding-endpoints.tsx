import { getUserData } from "../../../../../../utils/functions/tokenAndUserData";

const userData = getUserData();
const userId = userData?.id;

export const POST_PERSONAL_INFO = `/api/agent/${userId}/personal-info/`;
// export const POST_PERSONAL_INFO = `/api/agent/${userId}/personal-info/`;
