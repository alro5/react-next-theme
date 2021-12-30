import { User } from ".prisma/client";
import useSWR from "swr";
import { SERVER_URL } from "../const/const";
import { fetcher } from "../utils/shared";

export function useGetUser(id: number) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher);

  return {
    user: data as User,
    isLoading: !error && !data,
    isError: error
  }
}

export function useAllUsers() {
  const { data, error } = useSWR(`/api/users`, fetcher);

  return {
    users: data as User[],
    isLoading: !error && !data,
    isError: error
  }
}