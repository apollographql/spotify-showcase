import Suspense from './Suspense';
import {
  CurrentUserMenu,
  LayoutContainer,
  Main,
  Playbar,
  Route,
  Sidebar,
} from './ConferenceTalk';

const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Main>
        <CurrentUserMenu />
        <Suspense fallback={<Route.LoadingState />}>
          <Route />
        </Suspense>
      </Main>
      <Playbar />
    </LayoutContainer>
  );
};

export default Layout;
