import { mainMenu, utilityRoutes } from './mockData';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const menuRoutes = mainMenu.map((item) => item.route);

assert(!menuRoutes.includes('/chat'), 'Chat should be opened from the floating assistant, not the sidebar menu');
assert(utilityRoutes.includes('/chat'), 'Chat route should remain available as a hidden utility route');
assert(menuRoutes.includes('/mypage'), 'MyPage should stay in the sidebar for account and credit management');
assert(menuRoutes.length <= 7, 'Sidebar menu should stay compact enough to fit without scrolling');
