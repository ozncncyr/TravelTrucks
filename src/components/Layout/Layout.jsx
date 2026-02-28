import Header from "../Header/Header.jsx";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
