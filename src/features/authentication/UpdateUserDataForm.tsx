import { useUser } from '@/features/authentication/hooks/useUser';
import { useState } from 'react';
import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { useUpdateUser } from './hooks/useUpdateUser';
import camelcaseKeys from 'camelcase-keys';

function UpdateUserDataForm() {
  const { user } = useUser();

  const userData = camelcaseKeys(user?.user_metadata || {});

  const [fullName, setFullName] = useState(userData.fullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel() {
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
        <>
          <img src={avatar || userData.avatar} alt={avatar?.name} width="100" />
          <FileInput
            disabled={isUpdating}
            id="avatar"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setAvatar(e.target.files[0]);
              }
            }}
          />
        </>
      </FormRow>
      <FormRow>
        <>
          <Button onClick={handleCancel} type="reset" $variation="secondary">
            Reset
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
