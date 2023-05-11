import { useState } from "react";
import { MeetEditHeader } from "./MeetEditHeader";
import { MeetObjectPicker } from "./MeetObjectPicker";
import wallIcon from '../../assets/images/wall.svg';
import floorIcon from '../../assets/images/floor.svg';
import rugIcon from '../../assets/images/rug.svg';
import tableIcon from '../../assets/images/table.svg';
import chairIcon from '../../assets/images/chair.svg';
import couchIcon from '../../assets/images/couch.svg';
import decorIcon from '../../assets/images/decoration.svg';
import natureIcon from '../../assets/images/plant.svg';
import objectJSON from '../../assets/objects/objects.json';

export const MeetEdit = () => {
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");

  const isFormInvalid = true;

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
          selected={selected}
          setObject={setSelected}

        />
        <MeetObjectPicker 
          asset={objectJSON.floor}
          image={floorIcon}
          label="Pisos"
          selected={selected}
          setObject={setSelected}
        />
        <MeetObjectPicker 
          asset={objectJSON.rug}
          image={rugIcon}
          label="Tapetes"
          selected={selected}
          setObject={setSelected}
        />
        <MeetObjectPicker 
          asset={objectJSON.table}
          image={tableIcon}
          label="Mesas"
          selected={selected}
          setObject={setSelected}
        />
        <MeetObjectPicker 
          asset={objectJSON.chair}
          image={chairIcon}
          label="Cadeiras"
          selected={selected}
          setObject={setSelected}
        />
        <MeetObjectPicker 
          asset={objectJSON.couch}
          image={couchIcon}
          label="Sofás"
          selected={selected}
          setObject={setSelected}
        />
        <MeetObjectPicker 
          asset={objectJSON.decor}
          image={decorIcon}
          label="Decorações"
          selected={selected}
          setObject={setSelected}
        />
        <MeetObjectPicker 
          asset={objectJSON.nature}
          image={natureIcon}
          label="Plantas"
          selected={selected}
          setObject={setSelected}
        />
        </div>
        <div className="form">
          <span >Voltar</span>
          <button  className={isFormInvalid? 'disabled' : ''}>Salvar</button>
        </div>
      </div>
    </div>
  );
};
