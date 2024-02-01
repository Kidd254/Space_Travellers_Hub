import AppLogo from './AppLogo';
import MenuLink from './MenuLink';
import '../assets/styles/Header.css';

const Header = () => (
  <header>
    <div className="container">
      <nav className="navbar">
        <AppLogo />
        <ul id="navigation">
          <MenuLink url="/rockets" pageName="Rockets" />
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;