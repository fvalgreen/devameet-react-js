import { useState } from "react";
import { MeetEditHeader } from "./MeetEditHeader";
import { MeetObjectPicker } from "./MeetObjectPicker";
import wallIcon from "../../assets/images/wall.svg";
import floorIcon from "../../assets/images/floor.svg";
import rugIcon from "../../assets/images/rug.svg";
import tableIcon from "../../assets/images/table.svg";
import chairIcon from "../../assets/images/chair.svg";
import couchIcon from "../../assets/images/couch.svg";
import decorIcon from "../../assets/images/decoration.svg";
import natureIcon from "../../assets/images/plant.svg";
import objectJSON from "../../assets/objects/objects.json";
import { MeetObjectsRoom } from "./MeetObjectsRoom";

export const MeetEdit = () => {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<any>({});
  const [objects, setObjects] = useState<any>([]);

  const isFormInvalid = true;

  const setObject = (object: any) => {
    const newIndex = index + 1;
    object.id = newIndex;
    setIndex(newIndex);

    if (object.selectMultiple === true) {
      const newArray = [...objects, object];
      setObjects(newArray);
    } else {
      const filtered = objects.filter((o: any) => o.type !== object.type);
      filtered.push(object);
      setObjects(filtered);
    }

    setSelected(object);
  };

  const removeObject = (object: any) => {
    console.log(object)
    const filtered = objects.filter((o: any) => o.id !== object.id);
    setObjects(filtered);
    setSelected(null)
  }


  return (
    <div className="container-principal">
      <div className="container-meet">
        <MeetEditHeader
          color={color}
          setColor={setColor}
          name={name}
          setName={setName}
          isEdit={true}
        />
        <div className="scroll">
          <MeetObjectPicker
            asset={objectJSON.wall}
            image={wallIcon}
            label="Paredes"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.floor}
            image={floorIcon}
            label="Pisos"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.rug}
            image={rugIcon}
            label="Tapetes"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.table}
            image={tableIcon}
            label="Mesas"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.chair}
            image={chairIcon}
            label="Cadeiras"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.couch}
            image={couchIcon}
            label="Sofás"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.decor}
            image={decorIcon}
            label="Decorações"
            selected={selected?.name}
            setObject={setObject}
          />
          <MeetObjectPicker
            asset={objectJSON.nature}
            image={natureIcon}
            label="Plantas"
            selected={selected?.name}
            setObject={setObject}
          />
        </div>
        <div className="form">
          <span>Voltar</span>
          <button className={isFormInvalid ? "disabled" : ""}>Salvar</button>
        </div>
      </div>
      <MeetObjectsRoom objects={objects} selected={selected} setSelected={setSelected} removeObject={removeObject}/>
    </div>
  );
};
