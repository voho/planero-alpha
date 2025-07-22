import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ClerkProvider} from '@clerk/clerk-react';
import {App} from "./App";
import {ThemeProvider} from "styled-components";
import {defaultTheme} from "./theme"
import {csCZ} from '@clerk/localizations'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./globals";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ClerkProvider publishableKey={"pk_test_YWN0aXZlLWJ1bGxkb2ctNzcuY2xlcmsuYWNjb3VudHMuZGV2JA"}
                           afterSignOutUrl="/"
                           localization={csCZ}>
                <ThemeProvider theme={defaultTheme}>
                    <App/>
                </ThemeProvider>
            </ClerkProvider>
        </QueryClientProvider>
    </StrictMode>,
);
