import css from "./Layout.module.css";
import Header from "../Header/Header.jsx";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Header />
      {children}
    </div>
  );
}
