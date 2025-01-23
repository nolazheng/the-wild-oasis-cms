import Button from '@/ui/Button';
import { useCheckOut } from './hooks/useCheckOut';

function CheckoutButton({ bookingId }: { bookingId: string }) {
  const { isCheckingOut, checkOut } = useCheckOut();

  return (
    <Button
      $variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
