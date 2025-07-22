import { hc } from 'hono/client'
import {QueryClient} from "@tanstack/react-query";
import {AppType} from "../worker";

export const queryClient = new QueryClient()

export const apiClient = hc<AppType>("/")