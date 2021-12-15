import Link from 'next/link';
import React from 'react';
import { useAllUsers } from '../../hooks/user';

interface UserListProps {

}

export function UserList(props: UserListProps): JSX.Element {

  const { users, isLoading, isError } = useAllUsers();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return <div className="user-list">
    <ul>
      {users.map((user, index) => {
        return <li key={`user-list-${index}`}>
          <Link href={`/users/${user.id}`}>
            {user.name}
          </Link>
        </li>
      })}
    </ul>
  </div>
}