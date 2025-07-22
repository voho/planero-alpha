import 'styled-components'

interface IPalette {
    bg: string
    fg: string
}

declare module 'styled-components' {
    export interface DefaultTheme {
        spacing: (n: number) => string
        palette: {
            common: IPalette
            primary: IPalette
            secondary: IPalette
            header: IPalette

            background: {
                default: string
                alt: string
            }

            text: {
                primary: string
                muted: string
            }

            border: {
                default: string
            }

            success: IPalette
            warning: IPalette
            danger: IPalette
        }
    }
}
