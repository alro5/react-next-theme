import Header from './header'
import Footer from './footer'
import { Menu } from './menu'
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: JSX.Element }) {
  const { pathname } = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current && scrollerRef.current.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <div>
        <div className="page">
          <Menu />
          <div ref={scrollerRef} className="page__content">
            <Header />
            <div className="page__content__inner">
              <div className="wrap">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>

    </main>
  )
}