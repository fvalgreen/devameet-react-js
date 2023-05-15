import enterRoomIcon from '../../assets/images/enterRoom.svg'

type RoomObjectsProps = {
  objects: Array<any>,
  enterRoom():void

}

export const RoomObjects: React.FC<RoomObjectsProps> = ({objects, enterRoom}) => {
  const getImageFromObject = (object: any) => {
    if (object && object._id) {
      const path = `../../assets/objects/${object?.type}/${object?.name}${
        object.orientation ? "_" + object.orientation : ""
      }.png`;
      const imgUrl = new URL(path, import.meta.url);
      return imgUrl.href;
    }
  };

  const getClassFromObject = (object: any) => {
    let style = "";

    switch (object.y) {
      case 0: {
        style += " row-zero";
        break;
      }
      case 1: {
        style += " row-one";
        break;
      }
      case 2: {
        style += " row-two";
        break;
      }
      case 3: {
        style += " row-three";
        break;
      }
      case 4: {
        style += " row-four";
        break;
      }
      case 5: {
        style += " row-five";
        break;
      }
      case 6: {
        style += " row-six";
        break;
      }
      case 7: {
        style += "row-seven";
        break;
      }

      default:
        break;
    }

    switch (object.x) {
      case 0: {
        style += " column-zero";
        break;
      }
      case 1: {
        style += " column-one";
        break;
      }
      case 2: {
        style += " column-two";
        break;
      }
      case 3: {
        style += " column-three";
        break;
      }
      case 4: {
        style += " column-four";
        break;
      }
      case 5: {
        style += " column-five";
        break;
      }
      case 6: {
        style += " column-six";
        break;
      }
      case 7: {
        style += " column-seven";
        break;
      }

      default:
        break;
    }

    switch (object.zIndex) {
      case 0: {
        style += " zIndex-0";
        break;
      }
      case 1: {
        style += " zIndex-1";
        break;
      }
      case 2: {
        style += " zIndex-2";
        break;
      }
      case 3: {
        style += " zIndex-3";
        break;
      }

      default:
        break;
    }
    
    return style;
  };

  return (
    <div className="container-grid">
      <div className="center">
        <div className="grid">          
          {objects?.map((object: any) => (
            <img              
              key={object._id}
              src={getImageFromObject(object)}
              className={getClassFromObject(object)}
            />
          ))}
          <div className="preview">
            <img src={enterRoomIcon} alt='entrar na sala'/>
            <button onClick={enterRoom}>Entrar na Sala</button>
          </div>
        </div>        
      </div>
    </div>
  )
}