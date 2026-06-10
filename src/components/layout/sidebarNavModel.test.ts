import { buildSidebarNavModel } from './sidebarNavModel';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const chatModel = buildSidebarNavModel('/chat');
const dashboardModel = buildSidebarNavModel('/dashboard');

assert(chatModel.routeLabel === '채팅', 'utility chat route should still have a brand area label');
assert(
  !chatModel.menuItems.some((item) => item.route === '/chat'),
  'floating chat should not be duplicated as a sidebar menu item',
);
assert(dashboardModel.routeLabel === '대시보드', 'dashboard route should use the main menu label');
assert(dashboardModel.menuItems.length === 7, 'sidebar should keep the compact main menu route set');
