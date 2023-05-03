import logo from "../../assets/images/logo.svg";
import homeGrey from "../../assets/images/homeGrey.svg";
import homeBlue from "../../assets/images/homeBlue.svg";
import doorGrey from "../../assets/images/doorGrey.svg";
import doorBlue from "../../assets/images/doorBlue.svg";
import avatarIcon from "../../assets/images/avatar.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        if(location.pathname !== '/user' && location.pathname !== '/link' && location.pathname !== '/room'){
          return homeBlue;
        }
        return homeGrey;      
      case 'room':
        if(location.pathname === '/room' || location.pathname === '/link'){
          return doorBlue;
        }
        return doorGrey;      
    
      default:
        return "";
    }
  };

  const getSelectedClass = () => {
    if(location.pathname === '/user'){
      return 'selected';
    }
    return '';
  }

  return (
    <>
      <div className="container-header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="navigation">
          <ul>
            <li>
              <img
                src={getIcon('home')}
                alt="home"
                className="iconNav"
                onClick={() => navigate("/")}
              />
            </li>
            <li>
              <img
                src={getIcon('room')}
                alt="Entrar na reunião"
                className="iconNav"
                onClick={() => navigate("/link")}
              />
            </li>
            <li>
              <div className={"avatar mini " + getSelectedClass()}>
                <img src={avatarIcon} alt="Editar usuário" onClick={() => navigate("/user")} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
