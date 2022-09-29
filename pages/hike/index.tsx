import { log } from "console";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ApiUtils from "../../utils/ApiUtils";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

function Hike() {
  const { data, error } = useSWR(`/api/users`, ApiUtils.FetcherSWR());

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const users: User[] = data.users;

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}


export default Hike;
