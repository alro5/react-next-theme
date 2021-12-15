import React from 'react';
import { useUser } from '../../hooks/user';

interface UserProfileProps {

}

export function UserProfile(props: UserProfileProps): JSX.Element {
  const { user, isLoading, isError } = useUser();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return <div className="user-profile">
    <p>
      {user.name}<br />
      {user.phone} <br />
      {user.address}
    </p>
  </div>
}