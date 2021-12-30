import React from 'react';
import Link from 'next/link'
import { HeaderMenu } from './header-menu';


interface HeaderProps {

}

export default function Header(props: HeaderProps): JSX.Element {

  const { } = props;

  return <header className="header">
    <HeaderMenu />
  </header>
}