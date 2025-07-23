import {hc} from 'hono/client'
import {QueryClient} from "@tanstack/react-query";
import {AppType} from "../worker";
import OpenAI from 'openai';
import {Context} from "hono";

export type CustomContext = Context<{ Bindings: Env }>

export const queryClient = new QueryClient()

export const apiClient = hc<AppType>("/")

export const getAiClient = (apiKey: string) => new OpenAI({apiKey});