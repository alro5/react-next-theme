import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export function HeaderMenu(): JSX.Element {

  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const classes = classNames("header__menu", {
    "header__menu--active": active
  });

  return <div className={classes} onClick={() => setActive(!active)}>
    {session ? <>
      <div className="header__menu__avatar">
        {session.user?.image && <img src={session.user.image} alt={session.user?.name ?? 'User image'} />}
      </div>
      <div className="header__menu__dropdown">
        <span className="header__menu__dropdown__arrow"></span>
        <div className='header__menu__dropdown__header'>Signed in as <b>{session.user?.name}</b></div>
        <ul>
          <li>
            <Link href="/settings">
              <a>
                <FontAwesomeIcon icon={faCog} />
                Settings
              </a>
            </Link>
          </li>
          <li>
            <a onClick={() => signOut({ callbackUrl: '/' })}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </> : <button onClick={() => signIn()} type="button">Login</button>}

  </div>

}