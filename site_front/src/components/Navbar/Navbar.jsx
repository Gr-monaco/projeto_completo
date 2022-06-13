import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import "./Navbar.css";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const verificaUsuario = () =>{
    if(sessionStorage.getItem("currentUser") !== null){
      return true;
    }
    else{
      return false;
    }
  }

  const verificaUsuarioAdmin = () =>{
    if (!verificaUsuario()) return false;
    if(JSON.parse(sessionStorage.getItem("currentUser")).isAdmin) return true;
    return false;
  }

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
        <img src={images.japanlogo} alt="app logo" to="/" />
        </Link>
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans">
          <Link to="/">Home</Link>
        </li>
        <li className="p__opensans">
          <a href="#about">Sobre Nós</a>
        </li>
        <li className="p__opensans">
          <a href="#menu">Menu</a>
        </li>
        <li className="p__opensans">
          <a href="#contact">Contato</a>
        </li>
        {verificaUsuarioAdmin() ? <li><Link to="/painelAdmin" className="p__opensans">Painel de Administrador</Link></li> : null}
      </ul>
      <div className="app__navbar-login">
        <Link to="/login" className="p__opensans">
          Login
        </Link>

        <div />
        <Link to="/pedir" className="p__opensans">
          Fazer pedido
        </Link>
      </div>

      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li className="p__opensans">
                <Link to="/">Home</Link>
              </li>
              <li className="p__opensans">
                <a href="#about">Sobre Nós</a>
              </li>
              <li className="p__opensans">
                <a href="#menu">Menu</a>
              </li>
              <li className="p__opensans">
                <a href="#contact">Contato</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
