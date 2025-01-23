import ButtonIcon from '@/ui/ButtonIcon';
import { HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import { useLogout } from './hooks/useLogout';
import SpinnerMini from '@/ui/SpinnerMini';

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
