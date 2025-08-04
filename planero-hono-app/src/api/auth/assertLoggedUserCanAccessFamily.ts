import {CustomContext} from "../../react-app/globals";
import {getLoggedUserMemberships} from "./getLoggedUserMemberships";

type Params = {
    context: CustomContext;
    familyId: string;
}

export const assertLoggedUserCanAccessFamily = async ({context, familyId}: Params) => {
    const memberships = await getLoggedUserMemberships(context)

    if (!memberships) {
        throw new Error(`User does not belong to family: ${familyId}`)
    }

    if (!memberships.some(it => it.familyId === familyId)) {
        throw new Error(`User does not have any relation to family: ${familyId}`)
    }
};
