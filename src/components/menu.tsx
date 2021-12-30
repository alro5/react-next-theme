import Link from 'next/link';
import React from 'react';

export function Menu(): JSX.Element {

  return <div className="menu">
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About Us</a>
      </Link>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </nav>
  </div>
}