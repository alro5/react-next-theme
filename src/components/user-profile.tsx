import { useRouter } from 'next/router';
import React from 'react';
import { useGetUser } from '../../hooks/user';

interface UserProfileProps {

}

export function UserProfile(props: UserProfileProps): JSX.Element {
  const router = useRouter()
  const { uid } = router.query;

  const { user, isLoading, isError } = useGetUser(uid as string);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return <div className="user-profile">
    <img src="https://thiscatdoesnotexist.com/" alt="Cat" />
    <p>
      {user.name}<br />
      {user.phone} <br />
      {user.address.street}
    </p>
  </div>
}