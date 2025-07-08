import styled, { css } from 'styled-components';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
type TypographyColor = 'primary' | 'secondary' | 'disabled' | 'error' | 'success' | 'warning' | 'info';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
}

const getVariantStyles = (variant: TypographyVariant) => {
  const variantMap = {
    h1: css`
      font-size: ${props => props.theme.typography.fontSize['5xl']};
      font-weight: ${props => props.theme.typography.fontWeight.bold};
      line-height: 1.2;
    `,
    h2: css`
      font-size: ${props => props.theme.typography.fontSize['4xl']};
      font-weight: ${props => props.theme.typography.fontWeight.bold};
      line-height: 1.2;
    `,
    h3: css`
      font-size: ${props => props.theme.typography.fontSize['3xl']};
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
      line-height: 1.3;
    `,
    h4: css`
      font-size: ${props => props.theme.typography.fontSize['2xl']};
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
      line-height: 1.4;
    `,
    h5: css`
      font-size: ${props => props.theme.typography.fontSize.xl};
      font-weight: ${props => props.theme.typography.fontWeight.medium};
      line-height: 1.5;
    `,
    h6: css`
      font-size: ${props => props.theme.typography.fontSize.lg};
      font-weight: ${props => props.theme.typography.fontWeight.medium};
      line-height: 1.6;
    `,
    subtitle1: css`
      font-size: ${props => props.theme.typography.fontSize.md};
      font-weight: ${props => props.theme.typography.fontWeight.medium};
      line-height: 1.75;
    `,
    subtitle2: css`
      font-size: ${props => props.theme.typography.fontSize.sm};
      font-weight: ${props => props.theme.typography.fontWeight.medium};
      line-height: 1.57;
    `,
    body1: css`
      font-size: ${props => props.theme.typography.fontSize.md};
      font-weight: ${props => props.theme.typography.fontWeight.regular};
      line-height: 1.5;
    `,
    body2: css`
      font-size: ${props => props.theme.typography.fontSize.sm};
      font-weight: ${props => props.theme.typography.fontWeight.regular};
      line-height: 1.43;
    `,
    caption: css`
      font-size: ${props => props.theme.typography.fontSize.xs};
      font-weight: ${props => props.theme.typography.fontWeight.regular};
      line-height: 1.66;
    `,
    overline: css`
      font-size: ${props => props.theme.typography.fontSize.xs};
      font-weight: ${props => props.theme.typography.fontWeight.medium};
      line-height: 2.66;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    `,
  };

  return variantMap[variant];
};

const getColorStyles = (color: TypographyColor) => {
  const colorMap = {
    primary: css`
      color: ${props => props.theme.colors.text.primary};
    `,
    secondary: css`
      color: ${props => props.theme.colors.text.secondary};
    `,
    disabled: css`
      color: ${props => props.theme.colors.text.disabled};
    `,
    error: css`
      color: ${props => props.theme.colors.error.main};
    `,
    success: css`
      color: ${props => props.theme.colors.success.main};
    `,
    warning: css`
      color: ${props => props.theme.colors.warning.main};
    `,
    info: css`
      color: ${props => props.theme.colors.info.main};
    `,
  };

  return colorMap[color];
};

export const Typography = styled.p<TypographyProps>`
  margin: 0;
  ${props => getVariantStyles(props.variant || 'body1')}
  ${props => getColorStyles(props.color || 'primary')}
  text-align: ${props => props.align || 'left'};
  margin-bottom: ${props => props.gutterBottom ? props.theme.spacing.md : '0'};
  white-space: ${props => props.noWrap ? 'nowrap' : 'normal'};
  overflow: ${props => props.noWrap ? 'hidden' : 'visible'};
  text-overflow: ${props => props.noWrap ? 'ellipsis' : 'clip'};
`;

export default Typography;
