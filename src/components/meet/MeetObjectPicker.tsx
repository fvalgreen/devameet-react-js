import arrowDownIcon from "../../assets/images/arrowObjectDown.svg";
import arrowRightIcon from "../../assets/images/arrowObjectRight.svg";
import plusCircleIcon from "../../assets/images/plusCircle.svg";
import { useState } from "react";

type MeetObjectPickerType = {
  image: string;
  label: string;
  asset: any;
  selected: string;
  setObject(s:string):void;
};

export const MeetObjectPicker: React.FC<MeetObjectPickerType> = ({
  asset,
  image,
  label,
  selected,
  setObject
}) => {
  const [show, setShow] = useState(false);

  const getImageFromObject = (object: string) => {
    if (object && object.trim().length > 0) {
      const path = `../../assets/objects/${asset.path}/${object}${
        asset.canRotate ? "_front" : ""
      }.png`;
      const imgUrl = new URL(path, import.meta.url);
      return imgUrl.href;
    }
  };

  const selectObject = (object: string) => {
    setObject(object);
  }
  return (
    <div className="container-object-picker">
      <div className="action" onClick={() => setShow(!show)}>
        <img src={image} alt={label} />
        <span>{label}</span>
        <img src={show ? arrowRightIcon : arrowDownIcon} alt="arrow" />
      </div>
      {show && (
        <div className="objects" >
          {asset?.objects?.map((object: any) => (
            <div className={object === selected ? 'selected' : ''} onClick={() => selectObject(object)}>
              <img
                className={
                  "object " +
                  (asset.path === "wall" ||
                  asset.path === "floor" ||
                  asset.path === "couch"
                    ? "larger"
                    : "")
                }
                src={getImageFromObject(object)}
              />
              <img className="add" src={plusCircleIcon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
