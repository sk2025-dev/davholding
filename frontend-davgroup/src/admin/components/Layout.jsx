import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "./Toast";
import ProfileModal from "./ProfileModal";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Rdvs from "../pages/Rdvs";
import Products from "../pages/Products";
import BeautyServices from "../pages/BeautyServices";
import Photos from "../pages/Photos";
import Realisations from "../pages/Realisations";
import Promos from "../pages/Promos";
import { useAdmin } from "../hooks/useAdmin";
import "../styles/admin.css";

const Layout = () => {
  const { currentPanel } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPanel = () => {
    switch (currentPanel) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "rdvs":
        return <Rdvs />;
      case "products":
        return <Products />;
      case "beauty":
        return <BeautyServices />;
      case "photos":
        return <Photos />;
      case "realisations":
        return <Realisations />;
      case "promos":
        return <Promos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Topbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <div className="content-area">{renderPanel()}</div>
      </main>
      <Toast />
      <ProfileModal />
    </div>
  );
};

export default Layout;
