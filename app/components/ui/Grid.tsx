import styled from 'styled-components';

interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

interface RowProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const getMaxWidth = (maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
  const widthMap = {
    xs: '600px',
    sm: '960px',
    md: '1280px',
    lg: '1440px',
    xl: '1920px',
    full: '100%',
  };

  return widthMap[maxWidth];
};

const getSpacing = (spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const spacingMap = {
    xs: props => props.theme.spacing.xs,
    sm: props => props.theme.spacing.sm,
    md: props => props.theme.spacing.md,
    lg: props => props.theme.spacing.lg,
    xl: props => props.theme.spacing.xl,
  };

  return spacingMap[spacing];
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: ${props => getMaxWidth(props.maxWidth || 'lg')};
  padding-left: ${props => props.padding ? props.theme.spacing.md : '0'};
  padding-right: ${props => props.padding ? props.theme.spacing.md : '0'};
  box-sizing: border-box;
`;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${props => props.spacing ? `-${getSpacing(props.spacing)(props)}` : '0'};
  margin-right: ${props => props.spacing ? `-${getSpacing(props.spacing)(props)}` : '0'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
`;

export const Col = styled.div<ColProps>`
  position: relative;
  width: 100%;
  padding-right: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.md};
  flex: 0 0 auto;
  
  ${props => props.xs && `
    flex: 0 0 ${(props.xs / 12) * 100}%;
    max-width: ${(props.xs / 12) * 100}%;
  `}
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    ${props => props.sm && `
      flex: 0 0 ${(props.sm / 12) * 100}%;
      max-width: ${(props.sm / 12) * 100}%;
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    ${props => props.md && `
      flex: 0 0 ${(props.md / 12) * 100}%;
      max-width: ${(props.md / 12) * 100}%;
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    ${props => props.lg && `
      flex: 0 0 ${(props.lg / 12) * 100}%;
      max-width: ${(props.lg / 12) * 100}%;
    `}
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    ${props => props.xl && `
      flex: 0 0 ${(props.xl / 12) * 100}%;
      max-width: ${(props.xl / 12) * 100}%;
    `}
  }
`;

export default { Container, Row, Col };
