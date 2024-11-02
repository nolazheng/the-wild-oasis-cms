import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import Spinner from '@/ui/Spinner';

import { useGetSettings } from './hooks/useGetSettings';
import { SettingsType } from '@/types';
import { useUpdateSettings } from './hooks/useUpdateSettings';

function UpdateSettingsForm() {
  const { isLoading, settings } = useGetSettings();
  const { isEditing, editSettings } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: keyof SettingsType
  ) => {
    const value = e.target.value;
    editSettings({ [field]: value });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
