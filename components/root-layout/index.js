import styles from './root-layout.module.css';
import Sidebar from '../sidebar';
import classNames from 'classnames';

import { Changa } from 'next/font/google';

const chaga = Changa({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <>
      <div className={chaga.className}>
        <div className={classNames(styles.container, chaga.className)}>
          <Sidebar />
          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </>
  );
}
