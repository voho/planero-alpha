import {getAiClient, CustomContext} from "../../react-app/globals";
import {getCurrentFamily} from "../families/getCurrentFamily";

type Params = {
    context: CustomContext
}

export const getTipOfDay = async ({context}: Params) => {
    const openai = await getAiClient(context)

    const family = await getCurrentFamily({context})

    const familyDescription = family.members.map(member => {
        return `${member.name} (pohlaví: ${member.gender}, datum narození: ${member.bornAt})`;
    }).join("; ");

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Jsi rodinný asistent. Odpovídej česky, v souvislých větách, bez formátovacích značek. Může použít pár emojis.`
            },
            {role: "system", content: `Rodina má následující členy: ${familyDescription}`},
            {
                role: "user",
                content: "Vygeneruj prosím náhodnou a originální pochvalu pro mou rodinu přímo na míru!"
            }
        ],
        model: "gpt-4o-mini",
        temperature: 1,
        user: family.id,
    });

    const tipContent = completion.choices[0]?.message?.content ?? "Omlouvám se, dnes mě nic nenapadá :(";

    return {tipContent}
}