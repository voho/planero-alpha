import {hc} from 'hono/client'
import {QueryClient} from "@tanstack/react-query";
import {AppType} from "../worker";
import OpenAI from 'openai';
import {Context} from "hono";
import {Kysely} from 'kysely';
import {D1Dialect} from 'kysely-d1';
import {DB} from '../database/types';

export type CustomContext = Context<{ Bindings: Env }>

export const queryClient = new QueryClient()

export const apiClient = hc<AppType>("/")

export const getAiClient = async (context: CustomContext) => new OpenAI({apiKey: context.env.LOCAL_OPENAI_SECRET_KEY ?? await context.env.OPENAI_SECRET_KEY.get()});

export const getDb = (context: CustomContext) => new Kysely<DB>({dialect: new D1Dialect({database: context.env.db})});