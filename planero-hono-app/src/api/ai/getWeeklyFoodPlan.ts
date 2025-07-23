import {CustomContext, getAiClient} from "../../react-app/globals";
import {getCurrentFamily} from "../families/getCurrentFamily";
import {getCurrentFamilyFoodDetails} from "../families/getCurrentFamilyFoodDetails";

type Params = {
    c: CustomContext
}

export const getWeeklyFoodPlan =async ({c}:Params) => {
    const openai = getAiClient(c.env.LOCAL_OPENAI_SECRET_KEY ?? c.env.OPENAI_SECRET_KEY)

    const family = await getCurrentFamily()
    const meal = getCurrentFamilyFoodDetails()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Jsi rodinný asistent. Odpovídej česky, v souvislých větách, bez formátovacích značek. Může použít pár emojis.`
            },
            {role: "system", content: `JSON s detaily: ${JSON.stringify(meal )}`},
            {
                role: "user",
                content: "Vygeneruj prosím jídelníček na týden (snídaně, oběd, večeře) tak, aby chutnal pokud možno všem nebo alespoň většině."
            }
        ],
        model: "gpt-4o-mini",
        temperature: 1,
        user: family.id,
    });

    const answer = completion.choices[0]?.message?.content ?? "Omlouvám se, dnes mě nic nenapadá :(";

    // TODO
    return {
        answer
    }
}