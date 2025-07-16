import { Layout } from 'antd';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/main.scss";

const { Footer } = Layout;

const AppFooter = () => {
  const { isDarkMode } = useTheme();

  return (
    <Footer className={`app-footer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="footer-content">
        © 2025 Terminal Goods. Proyecto de aprendizaje frontend.
      </div>
    </Footer>
  );
};

export default AppFooter;