import { MeetEditHeader } from "./MeetEditHeader";
import trashIcon from "../../assets/images/trashObject.svg";
import arrowRightIcon from "../../assets/images/rotateRight.svg";
import arrowLeftIcon from "../../assets/images/rotateLeft.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeetServices } from "../../services/MeetServices";

const meetService = new MeetServices();

export const MeetAdd = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const goBack = () => {
    return navigate(-1);
  };

  const isFormInvalid = (!name || name.trim().length < 5 || !color || color.trim().length < 4)

  const doSave = async () => {
    try {
      if(isFormInvalid){
        return;
      }

      await meetService.createMeet({name, color});
      return goBack();
      
    } catch (error: any) {
      if(error?.response.data?.message){
        console.log("Houve um erro ao criar a reunião: ", error?.response.data?.messag )
      }else{
        console.log("Houve um erro ao criar a reunião: ", error);        
      }
    }
  }


  return (
    <div className="container-principal">
      <div className="container-meet">
        <MeetEditHeader
          color={color}
          name={name}
          setColor={setColor}
          setName={setName}
          isEdit={false}
        />
        <div className="form">
          <span onClick={goBack}>Voltar</span>
          <button onClick={doSave} disabled={isFormInvalid}className={isFormInvalid? 'disabled' : ''}>Salvar</button>
        </div>
      </div>
      <div className="container-grid">
        <div className="center">
          <div className="grid">
            <div className="line row one"></div>
            <div className="line row two"></div>
            <div className="line row three"></div>
            <div className="line row four"></div>
            <div className="line row five"></div>
            <div className="line row six"></div>
            <div className="line row seven"></div>
            <div className="line column one"></div>
            <div className="line column two"></div>
            <div className="line column three"></div>
            <div className="line column four"></div>
            <div className="line column five"></div>
            <div className="line column six"></div>
            <div className="line column seven"></div>
          </div>
          <div className="actions">
            <div>
              <img src={trashIcon} />
            </div>
            <div>
              <img src={arrowRightIcon} />
            </div>
            <div>
              <img src={arrowLeftIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
