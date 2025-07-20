import {useState, useEffect} from 'react'
import {Grid, Layout, Menu, Drawer, Button} from 'antd'
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
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const { Header } = Layout

const AppHeader = () => {
  const screens = Grid.useBreakpoint()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const {isDarkMode, toggleTheme} = useTheme()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    {label: 'Home', key: '/', icon: <HomeOutlined />},
    {label: 'Productos', key: '/products', icon: <AppstoreOutlined />},
    {label: 'Perfil', key: '/profile', icon: <UserOutlined />},
    {label: 'Carrito', key: '/cart', icon: <ShoppingCartOutlined />},
    {label: 'Login', key: '/login', icon: <LoginOutlined />},
    {label: 'Registrarse', key: '/register', icon: <UserAddOutlined />},
  ]

  const selectedKey =
    menuItems
      .filter((item) => location.pathname.startsWith(item.key))
      .sort((a, b) => b.key.length - a.key.length)[0]?.key || '/'

  const onMenuClick = ({key}) => {
    navigate(key)
    setDrawerVisible(false)
  }

  return (
    <Header className={`app-header ${isDarkMode ? 'dark' : 'light'}`}>
      <div
        className='logo'
        onClick={() => navigate('/')}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
      >
        Terminal <span>Goods</span>
      </div>

      {!isMobile && (
        <Menu
          className='app-menu'
          theme={isDarkMode ? 'dark' : 'light'}
          mode='horizontal'
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={onMenuClick}
        />
      )}

      <Button
        className='theme-toggle'
        type='text'
        onClick={toggleTheme}
        icon={isDarkMode ? <BulbOutlined /> : <MoonOutlined />}
        aria-label='Toggle theme'
      />

      {isMobile && (
        <>
          <Button
            className='menu-toggle'
            type='text'
            icon={drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
            onClick={() => setDrawerVisible(!drawerVisible)}
            aria-label='Toggle menu'
          />

          <Drawer
            title='Menu'
            placement='right'
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyles={{padding: 0}}
            closeIcon={null}
          >
            <Menu
              className='app-menu-drawer'
              theme={isDarkMode ? 'dark' : 'light'}
              mode='inline'
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={onMenuClick}
            />
          </Drawer>
        </>
      )}
    </Header>
  )
}

export default AppHeader
