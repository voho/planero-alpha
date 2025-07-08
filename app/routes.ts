import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  layout('./layout/Layout.tsx', [index('./pages/HomePage.tsx'), route('demo', './pages/TypographyShowcase.tsx')]),
] satisfies RouteConfig;
