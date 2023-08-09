import Suspense from './Suspense';
import {
  UserMenu,
  LayoutContainer,
  Main,
  Playbar,
  Route,
  Sidebar,
} from './ConferenceTalk';

const Layout = () => {
  return (
    <Suspense fallback={<LayoutContainer.LoadingState />}>
      <LayoutContainer>
        <Sidebar />
        <Main>
          <UserMenu />
          <Suspense fallback={<Route.LoadingState />}>
            <Route />
          </Suspense>
        </Main>
        <Playbar />
      </LayoutContainer>
    </Suspense>
  );
};

export default Layout;
