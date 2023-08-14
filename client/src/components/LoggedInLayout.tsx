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
    <LayoutContainer>
      <Sidebar />
      <Main>
        <UserMenu />
        <Route />
      </Main>
      <Playbar />
    </LayoutContainer>
  );
};

export default Layout;
