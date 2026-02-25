import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const CamperDetailsPage = lazy(
  () => import("./pages/CamperDetailsPage/CamperDetailsPage.jsx"),
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:camperId" element={<CamperDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
