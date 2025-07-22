import {Hono} from "hono";
import {assertAuthenticated} from "../assert";

export const app = new Hono<{ Bindings: Env }>()
    .get('/current',  (c) => {
    assertAuthenticated(c)
    
    return c.json({
        id: "test",
        name: "Rodina Testovací",
        members: [
            {
                id: "test-father",
                name: "Táta Testovací",
                role: "father"
            },
            {
                id: "test-mother",
                name: "Máma Testovací",
                role: "mother"
            },
            {
                id: "test-son",
                name: "Syn Testovací",
                role: "son"
            },
            {
                id: "test-daughter",
                name: "Dcera Testovací",
                role: "daughter"
            }
        ]
    })
})

export default app;