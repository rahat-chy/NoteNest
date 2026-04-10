import Link from "next/link";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={`${styles.navBar}`}>
      <div className={`${styles.navBarItems}`}>
        <img
          src="/noteLogo.png"
          className={`${styles.navBarLogo}`}
          width={30}
          height={30}
        />
        <Link href="/" className={`nav-link ${styles.navBarOptions}`}>
          Home
        </Link>
        <span className={`${styles.navBarOptions}`}>|</span>
        <Link href="/doneNotes" className={`nav-link ${styles.navBarOptions}`}>
          Done Notes
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
