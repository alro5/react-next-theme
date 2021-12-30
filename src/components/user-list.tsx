import Link from 'next/link';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useAllUsers } from '../../hooks/user';
import { post, remove } from '../../services/services';
import { useModal } from "react-modal-hook";
import { UserModal } from './modals/user-modal';

export function UserList(): JSX.Element {

  const { users, isLoading, isError } = useAllUsers();
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<Record<string, string> | null>({
    statusText: '',
    code: ''
  });

  async function deleteUser(id: string) {
    await remove(`/api/user/${id}`).then(_ => {
      mutate(`/api/users`);
    }).catch(e => {
      console.log('e :', e);
    });
  }

  async function addNewUser(user: { name: string, email: string }) {
    await post('/api/users', user).then(_ => {
      mutate('/api/users');
      hideModal();
    }).catch(e => {
      setError(e);
    }).finally(() => {
      setTimeout(() => {
        setError(null)
      }, 3000)
    });
  }

  const [showModal, hideModal] = useModal(() => (
    <UserModal onCloseRequest={hideModal} error={error} update={(v) => addNewUser(v)} />
  ), [error]);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return <div className="user-list">
    {users.length > 0 ? <ul>
      {users.map((user, index) => {
        return <li key={`user-list-${index}`}>
          <Link href={`/users/${user.id}`}><a><span>{user.name}</span> <span>{user.email}</span></a></Link>
          <button type="button" onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      })}
    </ul> : <p>No users yet</p>}

    <button onClick={showModal}>+ Add user</button>
  </div>
}