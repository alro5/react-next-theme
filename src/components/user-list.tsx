import Link from 'next/link';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useAllUsers } from '../../hooks/user';
import { post, remove } from '../../services/services';
import { useModal } from "react-modal-hook";
import { UserModal } from './modals/user-modal';
import { SERVER_URL } from '../../const/const';

export function UserList(): JSX.Element {

  console.log('SERVER_URL :', SERVER_URL);

  const { users, isLoading, isError } = useAllUsers();
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<Record<string, string> | null>({
    statusText: '',
    code: ''
  });

  async function deleteUser(id: string) {
    await remove(`${SERVER_URL}/api/user/${id}`).then(_ => {
      mutate(`${SERVER_URL}/api/users`);
    }).catch(e => {
      console.log('e :', e);
    });
  }

  async function addNewUser(user: { name: string, email: string }) {
    await post(`${SERVER_URL}/api/users`, user).then(_ => {
      mutate(`${SERVER_URL}/api/users`);
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