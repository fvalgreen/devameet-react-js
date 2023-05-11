import trashIcon from "../../assets/images/trashObject.svg";
import arrowRightIcon from "../../assets/images/rotateRight.svg";
import arrowLeftIcon from "../../assets/images/rotateLeft.svg";

type MeetObjectsRoomType = {
  objects?: [];
  selected?: any;
  setSelected?(s: any): void;
  removeObject?(o: any): void;
};

export const MeetObjectsRoom: React.FC<MeetObjectsRoomType> = ({
  objects,
  selected,
  setSelected,
  removeObject,
}) => {
  const getImageFromObject = (object: any) => {
    if (object && object.id) {
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

    if (object.name === selected?.name) {
      style += " selected";
    }
    return style;
  };

  return (
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
          {objects?.map((object: any) => (
            <img
              onClick={() =>
                selected?.name === object.name
                  ? setSelected!!(null)
                  : setSelected!!(object)
              }
              key={object._id}
              src={getImageFromObject(object)}
              className={getClassFromObject(object)}
            />
          ))}
        </div>
        <div className="actions">
          <div className={selected?.id ? " active" : ""}>
            <img
              src={trashIcon}
              onClick={() => (selected?.id ? removeObject!!(selected) : null)}
            />
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
  );
};
