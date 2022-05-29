import { Login } from 'components/Login/Login';
import { Header, BoxHeader, Footer, Main } from './Layout.styled';
import { Conteiner } from 'components/Conteiner/Conteiner.styled';
import { BoxFooter } from 'components/BoxFooter/BoxFooter';
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Unlogin } from 'components/UnLogin/Unlogin';
import { linkActiv } from '../utilits/linkActiv';
// import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Layout() {
  const auth = useSelector(state => state.auth);
  // const location = useLocation();
  return (
    <>
      <Header>
        <Conteiner>
          <BoxHeader>
            {auth !== '' ? (
              <NavLink style={linkActiv} to="/contacts">
                Contacts
              </NavLink>
            ) : (
              <div></div>
            )}
            {auth === '' ? <Login /> : <Unlogin auth={auth}>UnLogin</Unlogin>}
          </BoxHeader>
        </Conteiner>
      </Header>
      <Main>
        <Conteiner>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Outlet />
          </Suspense>
        </Conteiner>
      </Main>
      <Footer>
        <Conteiner>
          <BoxFooter />
        </Conteiner>
      </Footer>
    </>
  );
}
