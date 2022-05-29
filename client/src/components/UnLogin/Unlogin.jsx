import { useDispatch } from 'react-redux';
import { newToken } from 'redux/sliceToken';
import { UnLogined } from './UnLogin.styled';
import { isAuth } from 'redux/sliceAuth';
import { useSelector } from 'react-redux';
import { useUnLoginUserMutation } from 'server/contacts';

export function Unlogin() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [unloginUser] = useUnLoginUserMutation();

  return (
    <>
      {auth ?? <div>User :{auth}</div>}
      <UnLogined
        onClick={() => {
          unloginUser();
          dispatch(newToken(''));
          dispatch(isAuth(''));
        }}
      >
        Unlogin
      </UnLogined>
    </>
  );
}

Unlogin.propTypes = {};
