// theme.ts
import {DefaultTheme} from 'styled-components'

export const defaultTheme: DefaultTheme = {
    spacing: (n: number) => `${n * 0.5}rem`,
    palette: {
        common: {
            fg: '#3E3E3E',     // základní text
            bg: '#F5EFE7'      // světlé béžové pozadí
        },
        primary: {
            bg: '#6E5849',     // tmavě hnědá (akcent)
            fg: '#FFFFFF'      // bílý text na primární barvě
        },
        secondary: {
            bg: '#7A9D54',     // tlumená zelená
            fg: '#FFFFFF'
        },
        header: {
            bg: '#bdcfa8',     // tlumená zelená
            fg: '#FFFFFF'
        },
        background: {
            default: '#F5EFE7', // hlavní pozadí (béžová)
            alt: '#E8E1D9'      // boxy, karty, pole
        },
        text: {
            primary: '#3E3E3E',
            muted: '#77726B'
        },
        border: {
            default: '#D6CFC7'
        },
        success: {
            bg: '#C3D9B0',
            fg: '#3E3E3E'
        },
        warning: {
            bg: '#F5D6A0',
            fg: '#3E3E3E'
        },
        danger: {
            bg: '#E6A29A',
            fg: '#3E3E3E'
        }
    }
}
