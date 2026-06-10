import { authMenu, mainMenu, utilityRoutes, type AppRoute } from '../data/mockData';

const allRoutes = [...mainMenu.map((item) => item.route), ...utilityRoutes, ...authMenu.map((item) => item.route)];

export const authRoutes: AppRoute[] = ['/login', '/signup', '/password-reset'];

export function readRouteFromHash(): AppRoute {
  const hash = window.location.hash.replace('#', '') as AppRoute;
  return allRoutes.includes(hash) ? hash : '/dashboard';
}
