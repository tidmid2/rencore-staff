import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { setCredentials } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useMemo(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      dispatch(setCredentials({ user: JSON.parse(storedUser) }));
    }
  }, [user, dispatch]);

  useMemo(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return useMemo(() => ({ user }), [user]);
};
