import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Spinner from '@/ui/Spinner';
import BookingDataBox from './BookingDataBox';
import Row from '@/ui/Row';
import Heading from '@/ui/Heading';
import Tag from '@/ui/Tag';
import ButtonGroup from '@/ui/ButtonGroup';
import Button from '@/ui/Button';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';

import { useGetBookingById } from '@/features/bookings/hooks/useGetBookingById';
import { useDeleteBooking } from '@/features/bookings/hooks/useDeleteBooking';
import { useMoveBack } from '@/hooks/useMoveBack';
import { useCheckOut } from '@/features/check-in-out/hooks/useCheckOut';

import ButtonText from '@/ui/ButtonText';
import Empty from '@/ui/Empty';
import { statusToTagName } from '@/types';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useGetBookingById();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkOut, isCheckingOut } = useCheckOut();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Toggle openName="delete">
            <Button $variation="danger">Delete booking</Button>
          </Modal.Toggle>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
