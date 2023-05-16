import { useEffect, useState } from "react";
import emptyIcon from "../../assets/images/emptyList.svg";
import { useNavigate, useParams } from "react-router-dom";
import copyIcon from "../../assets/images/copy.svg";
import { RoomObjects } from "./RoomObjects";
import { RoomServices } from "../../services/RoomServices";
import { createPeerConnectionContext } from "../../services/WebSocketServices";
import arrowUpIcon from "../../assets/images/arrowUpMove.svg";
import arrowLeftIcon from "../../assets/images/arrowLeftMove.svg";
import arrowRightIcon from "../../assets/images/arrowRightMove.svg";
import arrowDownIcon from "../../assets/images/arrowDownMove.svg";

const roomServices = new RoomServices();
const wsServices = createPeerConnectionContext();

export const RoomHome = () => {
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [me, setMe] = useState<any>({});
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  const { link } = useParams();

  const userId = localStorage.getItem("id") || "";

  const mobile = window.innerWidth <= 992;

  useEffect(() => {
    getRoom();
  }, []);
  useEffect(() => {
    document.addEventListener('keyup', (event: any) => doMovement(event));

    return () => {
      document.removeEventListener('keyup', (event: any) => doMovement(event));
    }
  }, []);

  const getRoom = async () => {
    try {
      if (!link) {
        return navigate("/");
      }

      const result = await roomServices.getRoomByLink(link);

      if (!result || !result.data) {
        return;
      }

      const { color, name, objects } = result.data;

      setName(name);
      setColor(color);

      const newObjects = objects.map((o: any) => {
        return { ...o, type: o?.name?.split("_")[0] };
      });

      setObjects(newObjects);
    } catch (error) {
      console.log("Ocorreu erro ao buscar dados da sala: ", error);
    }
  };

  const enterRoom = () => {
    if (!link || !userId) {
      return navigate("/");
    }
    wsServices.joinRoom(link, userId);
    wsServices.onUpdateUserList(async (users: any) => {
      if (users) {
        setConnectedUsers(users);
        localStorage.setItem("connectedUsers", JSON.stringify(users));

        const me = users.find((u: any) => u.user === userId);
        if (me) {
          setMe(me);
          localStorage.setItem("me", JSON.stringify(me));
        }
      }
    });
    wsServices.onRemoveUser((socketId: any) => {
      const connectedStr = localStorage.getItem("connectedUsers") || "";
      const connectedUsers = JSON.parse(connectedStr);

      const filtered = connectedUsers?.filter(
        (u: any) => u.clientId !== socketId
      );
      setConnectedUsers(filtered);
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const toggleMute = () => {
    const payload = {
      userId,
      link,
      muted: !me.muted,
    };

    wsServices.updateUserMute(payload);
  };

  const doMovement = (event: any) => {
    const meStr = localStorage.getItem("me") || "";
    const user = JSON.parse(meStr);

    if (event && user) {
      const payload = {
        userId,
        link,
      } as any;

      switch (event.key) {
        case "ArrowUp": {
          payload.x = user.x;
          payload.orientation = "back";
          if (user.orientation === "back") {
            payload.y = user.y > 1 ? user.y - 1 : 1;
          } else {
            payload.y = user.y;
          }
          break;
        }

        case "ArrowDown": {
          payload.x = user.x;
          payload.orientation = "front";
          if (user.orientation === "front") {
            payload.y = user.y < 7 ? user.y + 1 : 7;
          } else {
            payload.y = user.y;
          }
          break;
        }

        case "ArrowLeft": {
          payload.y = user.y;
          payload.orientation = "left";
          if (user.orientation === "left") {
            payload.x = user.x > 0 ? user.x - 1 : 0;
          } else {
            payload.x = user.x;
          }
          break;
        }

        case "ArrowRight":
          {
            payload.y = user.y;
            payload.orientation = "right";
            if(user.orientation === "right"){
              payload.x = user.x < 7 ? user.x + 1 : 7;
            }else{
              payload.x = user.x;
            }
            break;
          }

        default:
          break;
      }

      if(payload.x >= 0 && payload.y >= 0 && payload.orientation){
        wsServices.updateUserMovement(payload);
      }
    }
  };

  return (
    <div className="container-principal">
      <div className="container-room">
        {objects && objects.length > 0 ? (
          <>
            <div className="resume">
              <div onClick={copyLink}>
                <span>
                  <strong>Reunião</strong> {link}
                </span>
                <img src={copyIcon} alt="Copie o link da sala" />
              </div>
              <p style={{ color: color }}>{name}</p>
            </div>
            <RoomObjects
              connectedUsers={connectedUsers}
              me={me}
              objects={objects}
              enterRoom={enterRoom}
              toggleMute={toggleMute}
            />
            {mobile && me?.user && (
              <div className="movement">
                <div
                  className="button"
                  onClick={() => doMovement({ key: "ArrowUp" })}
                >
                  <img src={arrowUpIcon} alt="andar para cima" />
                </div>
                <div className="line">
                  <div
                    className="button"
                    onClick={() => doMovement({ key: "ArrowLeft" })}
                  >
                    <img src={arrowLeftIcon} alt="andar para esquerda" />
                  </div>
                  <div
                    className="button"
                    onClick={() => doMovement({ key: "ArrowDown" })}
                  >
                    <img src={arrowDownIcon} alt="andar para baixo" />
                  </div>
                  <div
                    className="button"
                    onClick={() => doMovement({ key: "ArrowRight" })}
                  >
                    <img src={arrowRightIcon} alt="andar para direita" />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty">
            <img src={emptyIcon} />
            <p>Reunião não encontrada :/</p>
          </div>
        )}
      </div>
    </div>
  );
};
