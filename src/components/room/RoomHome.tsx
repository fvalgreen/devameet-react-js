import { useEffect, useState } from "react";
import emptyIcon from "../../assets/images/emptyList.svg";
import { useNavigate, useParams } from "react-router-dom";
import copyIcon from "../../assets/images/copy.svg";
import { RoomObjects } from "./RoomObjects";
import { RoomServices } from "../../services/RoomServices";

const roomServices = new RoomServices();

export const RoomHome = () => {
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  const {link} = useParams();

  useEffect(() => {
    getRoom();
  },[])

  const getRoom = async () => {
    try {
      if(!link){
        return navigate('/');
      }

      const result = await roomServices.getRoomByLink(link)

      if(!result || !result.data){
        return;
      }

      const {color, name, objects} = result.data;

      setName(name);
      setColor(color);

      const newObjects = objects.map((o: any) => {
        return {...o, type: o?.name?.split('_')[0]}
      })

      setObjects(newObjects);
    } catch (error) {
      console.log("Ocorreu erro ao buscar dados da sala: ", error)
    }
  }

  const enterRoom = () => {

  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return(
    <div className="container-principal">
      <div className="container-room">
        {objects && objects.length > 0 
        ?
          <>
            <div className="resume">
              <div onClick={copyLink}>
                <span><strong>Reunião</strong> {link}</span>
                <img src={copyIcon} alt="Copie o link da sala" />
              </div>
              <p style={{color: color}}>{name}</p>
            </div>
            <RoomObjects objects={objects} enterRoom={enterRoom} />
          </>
        :
          <div className="empty">
            <img src={emptyIcon} />
            <p>Reunião não encontrada :/</p>
          </div>
        }
      </div>
    </div>
  )
}