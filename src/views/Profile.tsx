import { ActionHeader } from "../components/general/ActionHeader";
import { AvatarInput } from "../components/general/AvatarInput";
import { Footer } from "../components/general/Footer";
import { Header } from "../components/general/Header";
import { useState } from "react";
import clearIcon from "../assets/images/clear.svg"
import logoutIcon from "../assets/images/logout.svg"

export const Profile = () => {
  const [image, setImage] = useState("");
  const mobile = window.innerWidth <= 992;

  

  return (
    <>
      {!mobile && <Header />}
      <div className="container-profile">
        <ActionHeader />
        <AvatarInput image={image} setImage={setImage} />
        <div className="line" />
        <div className="input">
          <span>Nome</span>
          <input type="text" placeholder="Informe seu nome" />
          <img src={clearIcon} alt="Limpar campo" />
        </div>
        <div className="logout">
          <div>
            <img src={logoutIcon} alt="Logout" />
            <span>Sair</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
