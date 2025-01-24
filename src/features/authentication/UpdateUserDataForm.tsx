import { useUser } from '@/features/authentication/hooks/useUser';
import { useState } from 'react';
import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
// import { useUpdateUser } from './hooks/useUpdateUser';
import camelcaseKeys from 'camelcase-keys';

function UpdateUserDataForm() {
  // We don't need the loading state
  const { user } = useUser();

  const userData = camelcaseKeys(user?.user_metadata || {});

  const [fullName, setFullName] = useState(userData.fullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  // const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();
  const updateUser = (a, b) => {};
  const isUpdating = false;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel() {
    // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
    setFullName(userData.fullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={userData.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setAvatar(e.target.files[0]);
            }
          }}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={handleCancel} type="reset" $variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
