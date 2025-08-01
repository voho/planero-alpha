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
            menu: IPalette

            background: {
                default: string
                alt: string
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
