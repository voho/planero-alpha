import {getAiClient, CustomContext} from "../../react-app/globals";
import {getCurrentFamily} from "../families/getCurrentFamily";
import {SmartOperation, SMART_OPERATION_CONFIGS} from "./smartOperations";

type Params = {
    context: CustomContext;
    operation: SmartOperation;
    selectedMemberIds?: string[];
}

export const executeSmartOperation = async ({context, operation, selectedMemberIds}: Params) => {
    const openai = await getAiClient(context);
    const family = await getCurrentFamily({context});
    
    const config = SMART_OPERATION_CONFIGS[operation];
    if (!config) {
        throw new Error(`Unknown smart operation: ${operation}`);
    }

    // Filtrujeme členy rodiny podle výběru, pokud je specifikován
    const relevantMembers = selectedMemberIds && selectedMemberIds.length > 0 
        ? family.members.filter(member => selectedMemberIds.includes(member.id))
        : family.members;
    
    const familyDescription = relevantMembers.map(member => {
        return `${member.name} (pohlaví: ${member.gender}, datum narození: ${member.bornAt})`;
    }).join("; ");
    
    const memberContext = selectedMemberIds && selectedMemberIds.length > 0 && selectedMemberIds.length < family.members.length
        ? `Zaměř se konkrétně na tyto členy rodiny: ${familyDescription}`
        : `Rodina má následující členy: ${familyDescription}`;

    // Získáme aktuální datum pro kontext
    const currentDate = new Date().toLocaleDateString('cs-CZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: config.systemPrompt
            },
            {
                role: "system", 
                content: memberContext
            },
            {
                role: "system",
                content: `Aktuální datum: ${currentDate}`
            },
            {
                role: "user",
                content: config.prompt
            }
        ],
        model: "gpt-4o-mini",
        temperature: 0.8,
        user: family.id,
    });

    const result = completion.choices[0]?.message?.content ?? "Omlouvám se, momentálně mi nic nenapadá :(";

    return {
        operation,
        title: config.title,
        result,
        selectedMembers: relevantMembers.map(m => ({ id: m.id, name: m.name }))
    };
};
