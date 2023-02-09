import { ReactNode } from 'react';
import cx from 'classnames';
import { NavLink, Outlet, To } from 'react-router-dom';
import Page from '../components/Page';

const CollectionRoute = () => {
  return (
    <Page>
      <div className="flex flex-col gap-4 p-[var(--main-content--padding)]">
        <div className="flex gap-2">
          <PageLink to="playlists">Playlists</PageLink>
          <PageLink to="podcasts">Podcasts</PageLink>
          <PageLink to="artists">Artists</PageLink>
          <PageLink to="albums">Albums</PageLink>
        </div>
        <Outlet />
      </div>
    </Page>
  );
};

interface PageLinkProps {
  children: ReactNode;
  to: To;
}

const PageLink = ({ children, to }: PageLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return cx('rounded py-3 px-4 text-sm font-bold hover:no-underline', {
          'bg-surface-active': isActive,
        });
      }}
    >
      {children}
    </NavLink>
  );
};

export default CollectionRoute;
