import { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  BulbOutlined,
  MoonOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

const { Header } = Layout;

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_STATIC_URL || "http://localhost:3000";

const AppHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isDarkMode, toggleTheme } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Home", key: "/", icon: <HomeOutlined /> },
    { label: "Productos", key: "/products", icon: <AppstoreOutlined /> },
    ...(user
      ? [
          { label: "Perfil", key: "/profile", icon: <UserOutlined /> },
          { label: "Carrito", key: "/cart", icon: <ShoppingCartOutlined /> },
          ...(user.role === "admin"
            ? [{ label: "Admin", key: "/admin", icon: <UserOutlined /> }]
            : []),
          { label: "Logout", key: "/logout", icon: <LogoutOutlined /> },
        ]
      : [
          { label: "Login", key: "/login", icon: <LoginOutlined /> },
          { label: "Registrarse", key: "/register", icon: <UserAddOutlined /> },
        ]),
  ];

  const selectedKey =
    menuItems
      .filter((item) => location.pathname.startsWith(item.key))
      .sort((a, b) => b.key.length - a.key.length)[0]?.key || "/";

  const onMenuClick = ({ key }) => {
    if (key === "/logout") {
      logout();
      navigate("/");
    } else {
      navigate(key);
    }
    setDrawerVisible(false);
  };

  return (
    <Header className={`app-header ${isDarkMode ? "dark" : "light"}`}>
      <div
        className="logo"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}>
        Michi<span>Store</span>
      </div>

      {user && (
        <div
          onClick={() => navigate("/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginLeft: "1rem",
          }}>
          <img
            src={getAvatarUrl(user)}
            alt="Avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
            }}
          />
        </div>
      )}

      {!isMobile && (
        <Menu
          className="app-menu"
          theme={isDarkMode ? "dark" : "light"}
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={onMenuClick}
        />
      )}

      <Button
        className="theme-toggle"
        type="text"
        onClick={toggleTheme}
        icon={isDarkMode ? <BulbOutlined /> : <MoonOutlined />}
        aria-label="Toggle theme"
      />

      {isMobile && (
        <>
          <Button
            className="menu-toggle"
            type="text"
            icon={drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
            onClick={() => setDrawerVisible(!drawerVisible)}
            aria-label="Toggle menu"
          />

          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyles={{ padding: 0 }}
            closeIcon={null}>
            <Menu
              className="app-menu-drawer"
              theme={isDarkMode ? "dark" : "light"}
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={onMenuClick}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default AppHeader;
