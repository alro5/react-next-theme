import React from 'react';
import Link from 'next/link'


interface HeaderProps {

}

export default function Header(props: HeaderProps): JSX.Element {

  const { } = props;

  return <header className="header">
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
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  </header>
}