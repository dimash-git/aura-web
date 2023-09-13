import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Tab = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => {
  return (
    <div className={`${styles.tab} ${active ? styles.active : ""}`}>
      <div className={styles.icon}></div>
      {children}
    </div>
  );
};

const BottomNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <div className={styles.container}>
        <div className={styles.tabs}>
          <Tab>Breathing</Tab>
          <Tab active>Aura</Tab>
          <Tab>
            <Link to="/compatibility">Compatabilty</Link>
          </Tab>
          <Tab>Moons</Tab>
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;
