import React from 'react';
import { useUser } from '../../hooks/user';

interface UserProfileProps {

}

export function UserProfile(props: UserProfileProps): JSX.Element {
  const { user, isLoading, isError } = useUser();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return <div className="user-profile">
    <img src={user.picture.large} alt={user.name.first} />
    <p>
      {user.name.first} {user.name.last}, {user.gender}, {user.dob.age} <br />
      {user.phone} <br />
      {user.location.city}
    </p>
  </div>
}