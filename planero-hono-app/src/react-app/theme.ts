// theme.ts
import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = {
    spacing: (n: number) => `${n * 0.5}rem`,
    palette: {
        common: {
            fg: '#2F2617',     // tmavá kávová – základní text
            bg: '#F6F3EE'      // jemná krémová – pozadí stránky
        },
        primary: {
            bg: '#00704A',     // typická Starbucks zeleň
            fg: '#FFFFFF'      // kontrastní bílý text
        },
        paper: {
            bg: '#FFFFFF',     // čistě bílá pro karty
            fg: '#2F2617'      // tmavý text na papírovém pozadí
        },
        secondary: {
            bg: '#CBA135',     // latte barva – teplý akcent
            fg: '#FFFFFF'
        },
        header: {
            bg: '#A9C6B4',     // jemná tlumená zelená
            fg: '#2F2617'      // tmavý text
        },
        background: {
            default: '#F6F3EE', // hlavní krémové pozadí
            alt: '#E9E4DC'      // o něco tmavší – boxy, zvýraznění
        },
        text: {
            primary: '#2F2617',   // tmavá kávová
            muted: '#756B5E'      // neutrální, méně výrazný text
        },
        border: {
            default: '#D6CFC7'    // jemná šedobéžová linie
        },
        success: {
            bg: '#D4E9E2',        // mint green (pozitivní zpětná vazba)
            fg: '#2F2617'
        },
        warning: {
            bg: '#F5D6A0',        // jemně zlatá – decentní výstraha
            fg: '#2F2617'
        },
        danger: {
            bg: '#E6A29A',        // tlumená růžovo-červená
            fg: '#2F2617'
        }
    }
}
