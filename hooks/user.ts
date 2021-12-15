import useSWR from "swr";
import { fetcher } from "../utils/shared";
import { User } from '../models/user'

export function useUser() {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users`);

  return {
    user: data as User,
    isLoading: !error && !data,
    isError: error
  }
}

export function useGetUser(id: string) {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users/${id}`, fetcher);

  console.log("data", data);
  

  return {
    user: data as User,
    isLoading: !error && !data,
    isError: error
  }
}

export function useAllUsers() {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users`, fetcher);

  return {
    users: data ? (data as User[]) : [],
    isLoading: !error && !data,
    isError: error
  }
}