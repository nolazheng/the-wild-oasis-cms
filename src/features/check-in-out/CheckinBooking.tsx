import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

import Spinner from '@/ui/Spinner';
import Row from '@/ui/Row';
import Heading from '@/ui/Heading';
import ButtonGroup from '@/ui/ButtonGroup';
import Button from '@/ui/Button';
import ButtonText from '@/ui/ButtonText';
import Checkbox from '@/ui/Checkbox';

import BookingDataBox from '@/features/bookings/BookingDataBox';

import { useGetBookingById } from '@/features/bookings/hooks/useGetBookingById';
import { useMoveBack } from '@/hooks/useMoveBack';

import styled from 'styled-components';
import { box } from '@/styles/styles';
import { useGetSettings } from '@/features/settings/hooks/useGetSettings';
import Empty from '@/ui/Empty';
import { useCheckIn } from './hooks/useCheckIn';

const Box = styled.div`
  ${box}
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useGetBookingById();
  const { checkIn, isCheckingIn } = useCheckIn();
  const moveBack = useMoveBack();
  const { isLoading: isLoadingSettings, settings } = useGetSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return <Empty resourceName="checkin" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights * (settings?.breakfastPrice ?? 0) * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast)
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    else
      checkIn({
        bookingId,
      });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          // If the guest has already paid online, we can't even undo this
          disabled={isCheckingIn || confirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )} for breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
