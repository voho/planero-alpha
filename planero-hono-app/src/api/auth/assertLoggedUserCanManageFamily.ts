import {CustomContext} from "../../react-app/globals";
import {getLoggedUserMemberships} from "./getLoggedUserMemberships";

type Params = {
    context: CustomContext;
    familyId: string;
}

export const assertLoggedUserCanManageFamily = async ({context, familyId}: Params) => {
    const memberships = await getLoggedUserMemberships(context)

    if (!memberships) {
        throw new Error(`User does not belong to family: ${familyId}`)
    }

    if (!memberships.some(it => it.familyId === familyId && it.role === "adult")) {
        throw new Error(`User does not have permission to manage family: ${familyId}`)
    }
};
