import styled from 'styled-components';

interface CardProps {
  elevation?: 'none' | 'low' | 'medium' | 'high';
  padding?: boolean;
}

const getShadow = (elevation: 'none' | 'low' | 'medium' | 'high') => {
  const shadowMap = {
    none: 'none',
    low: props => props.theme.shadows.sm,
    medium: props => props.theme.shadows.md,
    high: props => props.theme.shadows.lg,
  };
  
  return shadowMap[elevation];
};

export const Card = styled.div<CardProps>`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => getShadow(props.elevation || 'medium')};
  padding: ${props => props.padding ? props.theme.spacing.md : '0'};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.grey[200]};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
`;

export const CardSubtitle = styled.p`
  margin: ${props => props.theme.spacing.xs} 0 0;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

export const CardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.grey[200]};
  
  & > * + * {
    margin-left: ${props => props.theme.spacing.sm};
  }
`;

export default Card;
