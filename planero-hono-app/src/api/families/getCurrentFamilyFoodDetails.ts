import {getCurrentFamily} from "./getCurrentFamily";
import {CustomContext} from "../../react-app/globals";

type Params = {
    context: CustomContext
}

export const getCurrentFamilyFoodDetails = async ({context}: Params) => {
    const family = await getCurrentFamily({context})

    return {
        generalFoodDetails: {
            generalCookingStyle: "jednoduché jídlo, hlavně aby bylo dobré a celkem zdravé",
            restrictions: "žádné restrikce, jíme maso i ryby, nejsme vegetariáni"
        },
        membersWithFoodDetails: family.members.map(member => {
            return {
                name: member.name,
                gender: member.gender,
                portion: 0.3 + Math.random(),
                likes: "pálivé, indické, italské, čína, česká kuchyně, tak nějak všechno",
                dislikes: "ovoce, syrečky, různé smradlavé věci",
                restrictions: "žádné",
            }
        })
    }
};