import { useRouter } from "next/router";
import { useGetUser } from "../../hooks/user";

const User = () => {
  const router = useRouter()
  const { uid } = router.query;

  const { user, isLoading, isError } = useGetUser(uid as string);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>User</h1>
      {user.name}
    </div>
  )

}

export default User;