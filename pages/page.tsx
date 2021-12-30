import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

const authPages = ["/settings"]

export default function Page(props: PropsWithChildren<{}>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { children } = props;

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated" && authPages.includes(router.pathname)) {
    return <p>Access Denied</p>;
  }

  return <>{children}</>;
}