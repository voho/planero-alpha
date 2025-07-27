export enum SmartOperation {
    WEEKEND_TRIP = 'weekend_trip',
    TOMORROW_MEAL = 'tomorrow_meal',
    FAMILY_ACTIVITY = 'family_activity',
    GIFT_IDEA = 'gift_idea',
    WEEKLY_SCHEDULE = 'weekly_schedule',
    BUDGET_TIP = 'budget_tip'
}

export const SMART_OPERATION_CONFIGS = {
    [SmartOperation.WEEKEND_TRIP]: {
        title: '🏞️ Výlet na víkend',
        description: 'Vymysli výlet na příští víkend',
        prompt: 'Vygeneruj prosím návrh výletu na příští víkend, který by se hodil pro naši rodinu. Zohledni věk členů rodiny, aktuální roční období a možnosti v okolí. Navrhni konkrétní místo, aktivity a praktické tipy.',
        systemPrompt: 'Jsi rodinný asistent specializující se na plánování výletů. Odpovídej česky, v souvislých větách, bez formátovacích značek. Můžeš použít pár emojis. Buď konkrétní a praktický.'
    },
    [SmartOperation.TOMORROW_MEAL]: {
        title: '🍽️ Jídlo na zítra',
        description: 'Vymysli jídlo na zítra',
        prompt: 'Navrhni prosím jídlo na zítra (snídaně, oběd, večeře), které by chutnalo naší rodině. Zohledni preference členů rodiny a sezónní dostupnost ingrediencí.',
        systemPrompt: 'Jsi rodinný kuchař a nutričník. Odpovídej česky, v souvislých větách, bez formátovacích značek. Můžeš použít pár emojis. Navrhuj zdravá a chutná jídla.'
    },
    [SmartOperation.FAMILY_ACTIVITY]: {
        title: '🎯 Rodinná aktivita',
        description: 'Navrhni aktivitu pro celou rodinu',
        prompt: 'Navrhni prosím zábavnou aktivitu, kterou může dělat celá rodina společně doma nebo v okolí. Zohledni věk všech členů a aktuální roční období.',
        systemPrompt: 'Jsi rodinný koordinátor aktivit. Odpovídej česky, v souvislých větách, bez formátovacích značek. Můžeš použít pár emojis. Navrhuj aktivity, které spojují rodinu.'
    },
    [SmartOperation.GIFT_IDEA]: {
        title: '🎁 Nápad na dárek',
        description: 'Vymysli dárek pro člena rodiny',
        prompt: 'Navrhni prosím originální nápad na dárek pro některého člena rodiny. Zohledni jeho věk, zájmy a aktuální příležitosti (narozeniny, svátky, úspěchy).',
        systemPrompt: 'Jsi expert na dárky a pozornosti. Odpovídej česky, v souvislých větách, bez formátovacích značek. Můžeš použít pár emojis. Navrhuj promyšlené a osobní dárky.'
    },
    [SmartOperation.WEEKLY_SCHEDULE]: {
        title: '📅 Týdenní plán',
        description: 'Naplánuj příští týden',
        prompt: 'Pomoz mi naplánovat příští týden pro naši rodinu. Navrhni rozložení aktivit, času pro práci, odpočinek a společné chvíle. Zohledni věk členů rodiny a jejich potřeby.',
        systemPrompt: 'Jsi rodinný plánovač a organizátor času. Odpovídej česky, v souvislých větách, bez formátovacích značek. Můžeš použít pár emojis. Vytvárej vyvážené a realistické plány.'
    },
    [SmartOperation.BUDGET_TIP]: {
        title: '💰 Tip na úspory',
        description: 'Poraď, jak ušetřit peníze',
        prompt: 'Navrhni prosím konkrétní tipy, jak může naše rodina ušetřit peníze v běžných výdajích. Zohledni velikost rodiny a praktické možnosti úspor.',
        systemPrompt: 'Jsi rodinný finanční poradce. Odpovídej česky, v souvislých větách, bez formátovacích značek. Můžeš použít pár emojis. Navrhuj praktické a realizovatelné úspory.'
    }
} as const;
