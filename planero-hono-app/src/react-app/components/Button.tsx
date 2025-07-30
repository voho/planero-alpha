import styled from "styled-components";
import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'medium',
    children,
    ...props
}: ButtonProps) => {
    return (
        <StyledButton
            $variant={variant}
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
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    
    /* Size variants */
    ${props => {
        switch (props.$size) {
            case 'small':
                return `
                    padding: 6px 12px;
                    font-size: 12px;
                `;
            case 'large':
                return `
                    padding: 12px 24px;
                    font-size: 16px;
                `;
            case 'medium':
            default:
                return `
                    padding: 10px 20px;
                    font-size: 14px;
                `;
        }
    }}
    
    /* Color variants */
    ${props => {
        switch (props.$variant) {
            case 'secondary':
                return `
                    background: transparent;
                    border: 1px solid ${props.theme.palette.border.default};
                    
                    &:hover:not(:disabled) {
                        background: ${props.theme.palette.background.alt};
                    }
                `;
            case 'danger':
                return `
                    background: ${props.theme.palette.danger.bg};
                    color: ${props.theme.palette.danger.fg};
                    border: 1px solid ${props.theme.palette.danger.bg};
                    
                    &:hover:not(:disabled) {
                        background: ${props.theme.palette.danger.bg};
                        opacity: 0.9;
                    }
                `;
            case 'primary':
            default:
                return `
                    background: ${props.theme.palette.primary.bg};
                    color: ${props.theme.palette.primary.fg};
                    border: 1px solid ${props.theme.palette.primary.bg};
                    
                    &:hover:not(:disabled) {
                        background: ${props.theme.palette.primary.bg};
                        opacity: 0.9;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }
                    
                    &:active:not(:disabled) {
                        transform: translateY(0);
                    }
                `;
        }
    }}
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${props => props.theme.palette.primary.bg}40;
    }
`;