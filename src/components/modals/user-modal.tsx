import React, { useEffect, useState } from 'react';
import { Modal } from './modal';

interface UserModalProps {
  update: ({ name, email }: { name: string, email: string }) => void;
  onCloseRequest: () => void;
  error: Record<string, string> | null;
}

export function UserModal(props: UserModalProps): JSX.Element {

  const { update, error, onCloseRequest } = props;
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  function onNameChange(v: any) {
    setName(v.target.value);
  }
  function onEmailChange(v: any) {
    setEmail(v.target.value);
  }

  useEffect(() => {
    setShowError(!!error)
  }, [error]);

  return <Modal onCloseRequest={onCloseRequest}>
    <h4>Add user</h4>
    <input onChange={onNameChange} placeholder="Username" type="text" />
    <input onChange={onEmailChange} placeholder="Email" type="text" />
    <button onClick={() => update({ name, email })}>Add</button>
    {showError && error && <p>{error.statusText}</p>}
  </Modal >
}