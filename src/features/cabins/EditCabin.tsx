import Modal from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import { CabinType } from '@/types';
import { HiPencil } from 'react-icons/hi2';

function EditCabin({ cabinToEdit }: { cabinToEdit?: CabinType }) {
  return (
    <Modal>
      <Modal.Toggle openName="edit-cabin">
        <button>
          <HiPencil />
        </button>
      </Modal.Toggle>
      <Modal.Window name="edit-cabin">
        <CreateCabinForm cabinToEdit={cabinToEdit} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabin;
