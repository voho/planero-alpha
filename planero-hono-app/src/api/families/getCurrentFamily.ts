export const getCurrentFamily = async () => {
    return {
        id: "test",
        name: "Rodina Testovací",
        members: [
            {
                id: "test-father",
                name: "Táta Testovací",
                role: "father",
                gender: "M",
                birthday: '1980-01-01',
                hobbies: ["hudba", "čtení", "crossfit", "IT", "gaming"]
            },
            {
                id: "test-mother",
                name: "Máma Testovací",
                role: "mother",
                gender: "F",
                birthday: '1981-01-01',
                hobbies: ["čtení", "knihy", "filmy", "seriály", "šití", "pletení", "tvoření"]
            },
            {
                id: "test-son",
                name: "Syn Testovací",
                role: "son",
                gender: "M",
                birthday: '2021-01-01',
                hobbies: ["policajti", "vojáci", "kreslení", "minecraft"]
            },
            {
                id: "test-daughter1",
                name: "Dcera1 Testovací",
                role: "daughter",
                gender: "F",
                birthday: '2014-01-01',
                hobbies: ["kreslení", "malování", "tvoření", "kreslení na tabletu", "gaming - roblox", "šití"]
            },
            {
                id: "test-daughter2",
                name: "Dcera2 Testovací",
                role: "daughter",
                gender: "F",
                birthday: '2017-01-01',
                hobbies: ["zvířata", "čtení", "kreslení", "minecraft", "roblox", "shorty"]
            }
        ]
    }
};