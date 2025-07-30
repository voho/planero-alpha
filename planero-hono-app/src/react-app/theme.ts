// theme.ts
import {DefaultTheme} from 'styled-components'

export const defaultTheme: DefaultTheme = {
    spacing: (n: number) => `${n * 0.5}rem`,
    palette: {
        common: {
            fg: '#2F2617',     // tmavá kávová – základní text
            bg: '#ffffff'      // jemná krémová – pozadí stránky
        },
        primary: {
            bg: '#00704A',     // typická Starbucks zeleň
            fg: '#FFFFFF'      // kontrastní bílý text
        },
        secondary: {
            bg: '#CBA135',     // latte barva – teplý akcent
            fg: '#FFFFFF'
        },
        header: {
            bg: '#A9C6B4',     // jemná tlumená zelená
            fg: '#2F2617'      // tmavý text
        },
        menu: {
            bg: '#b8d6c4',     // jemná tlumená zelená
            fg: '#2F2617'      // tmavý text
        },
        background: {
            default: '#ffffff', // hlavní krémové pozadí
            alt: '#F6F3EE'      // o něco tmavší – boxy, zvýraznění
        },
        border: {
            default: '#b8d6c4'    // jemná šedobéžová linie
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
