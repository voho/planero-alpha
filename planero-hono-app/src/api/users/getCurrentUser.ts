import {CustomContext} from "../../react-app/globals";
import {getLoggedUserContext} from "../auth/getLoggedUserContext";

export const getCurrentUser = async (context: CustomContext) => {
    return await getLoggedUserContext({context})
};
