import styled from "styled-components";
import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
}

export const Button = ({
                           variant,
    size = 'medium',
    children,
    ...props
}: ButtonProps) => {
    return (
        <StyledButton
            $variant={variant || 'default'}
            $size={size}
            {...props}
        >
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button<{
    $variant: ButtonVariant;
    $size: ButtonSize;
}>`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.025em;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    font-family: "Rubik", sans-serif;
    text-transform: none;

    /* Enhanced shadow for depth */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);

    /* Size variants with improved typography */
    ${props => {
        switch (props.$size) {
            case 'small':
                return `
                    padding: 6px 12px;
                    font-size: 13px;
                    font-weight: 500;
                    border-radius: 3px;
                `;
            case 'large':
                return `
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 5px;
                    letter-spacing: 0.03em;
                `;
            case 'medium':
            default:
                return `
                    padding: 8px 16px;
                    font-size: 14px;
                    font-weight: 600;
                `;
        }
    }}
        /* Color variants with beautiful gradients */
    ${props => {
        switch (props.$variant) {
            case 'secondary':
                return `
                    background: linear-gradient(135deg, #F5EFE7 0%, #F0E8DC 100%);
                    color: #2F2617;
                    border-color: #D4B896;
                    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

                    &:hover:not(:disabled) {
                        background: linear-gradient(135deg, #8B6F47 0%, #7A5F3C 100%);
                        color: #FFFFFF;
                        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                        box-shadow:
                            0 4px 12px rgba(139, 111, 71, 0.25),
                            0 2px 6px rgba(0, 0, 0, 0.1);
                    }

                    &:active:not(:disabled) {
                        background: linear-gradient(135deg, #7A5F3C 0%, #6B5231 100%);
                        box-shadow:
                            0 2px 6px rgba(139, 111, 71, 0.2),
                            0 1px 3px rgba(0, 0, 0, 0.08);
                    }
                `;
            case 'danger':
                return `
                    background: linear-gradient(135deg, #FEF1F1 0%, #FCEAEA 100%);
                    color: #2F2617;
                    border-color: #DC3545;
                    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

                    &:hover:not(:disabled) {
                        background: linear-gradient(135deg, #A71E2A 0%, #921A25 100%);
                        color: #FFFFFF;
                        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                        box-shadow:
                            0 4px 12px rgba(167, 30, 42, 0.25),
                            0 2px 6px rgba(0, 0, 0, 0.1);
                    }

                    &:active:not(:disabled) {
                        background: linear-gradient(135deg, #921A25 0%, #7D1620 100%);
                        box-shadow:
                            0 2px 6px rgba(167, 30, 42, 0.2),
                            0 1px 3px rgba(0, 0, 0, 0.08);
                    }
                `;
            case 'primary':
                return `
                    background: linear-gradient(135deg, #E8F5F0 0%, #DDF0E8 100%);
                    color: #2F2617;
                    border-color: #00855A;
                    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

                    &:hover:not(:disabled) {
                        background: linear-gradient(135deg, #004A32 0%, #003A27 100%);
                        color: #FFFFFF;
                        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                        box-shadow:
                            0 4px 12px rgba(0, 74, 50, 0.25),
                            0 2px 6px rgba(0, 0, 0, 0.1);
                    }

                    &:active:not(:disabled) {
                        background: linear-gradient(135deg, #003A27 0%, #002A1C 100%);
                        box-shadow:
                            0 2px 6px rgba(0, 74, 50, 0.2),
                            0 1px 3px rgba(0, 0, 0, 0.08);
                    }
                `;
            default:
                return `
                    background: linear-gradient(135deg, #F2F7F4 0%, #EDF4F0 100%);
                    color: #2F2617;
                    border-color: #A9C6B4;
                    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);

                    &:hover:not(:disabled) {
                        background: linear-gradient(135deg, #4A6B52 0%, #3A5A42 100%);
                        color: #FFFFFF;
                        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                        box-shadow:
                            0 4px 12px rgba(74, 107, 82, 0.25),
                            0 2px 6px rgba(0, 0, 0, 0.1);
                    }

                    &:active:not(:disabled) {
                        background: linear-gradient(135deg, #3A5A42 0%, #2A4A32 100%);
                        box-shadow:
                            0 2px 6px rgba(74, 107, 82, 0.2),
                            0 1px 3px rgba(0, 0, 0, 0.08);
                    }
                `;
        }
    }}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        filter: grayscale(0.3);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 4px ${props => {
            switch (props.$variant) {
                case 'secondary':
                    return 'rgba(196, 166, 118, 0.2)';
                case 'danger':
                    return 'rgba(220, 53, 69, 0.2)';
                case 'primary':
                    return 'rgba(0, 133, 90, 0.2)';
                default:
                    return 'rgba(169, 198, 180, 0.2)';
            }
        }},
        0 2px 4px rgba(0, 0, 0, 0.08);
    }

    /* Subtle inner highlight for premium feel */

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        border-radius: 4px 4px 0 0;
    }
`;