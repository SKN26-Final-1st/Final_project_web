import { mainMenu, type AppRoute } from '../../data/mockData';

export function buildSidebarNavModel(route: AppRoute) {
  const routeLabel = mainMenu.find((item) => item.route === route)?.label ?? (route === '/chat' ? '채팅' : '화면');

  return {
    routeLabel,
    menuItems: mainMenu,
  };
}
