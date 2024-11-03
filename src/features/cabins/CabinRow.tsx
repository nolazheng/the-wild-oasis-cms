import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';
import { formatCurrency } from '@/utils/helpers';
import { CabinType } from '@/types';

import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';
import Table from '@/ui/Table';
import Menus from '@/ui/Menus';
import CreateCabinForm from './CreateCabinForm';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinType }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const handleDuplicate = () => {
    if (isCreating) return;
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Toggle openName="cabin-edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Toggle>

                <Modal.Toggle openName="cabin-delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Toggle>
              </Menus.List>

              <Modal.Window name="cabin-edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="cabin-delete">
                <ConfirmDelete
                  resource="cabins"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabin)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
