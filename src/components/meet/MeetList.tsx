import { useEffect, useState } from "react";
import emptyicon from "../../assets/images/emptyList.svg";
import { MeetServices } from "../../services/MeetServices";
import { MeetListItem } from "./MeetListItem";
import { Modal } from "react-bootstrap";

const meetServices = new MeetServices();

export const MeetList = () => {
  const [meets, setMeets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getMeets();
  }, []);

  const getMeets = async () => {
    try {
      const result = await meetServices.getMeets();
      if (result?.data) {
        setMeets(result.data);
      }
    } catch (error) {
      console.log("Ocorreu um erro ao listar as reuniões: ", error);
    }
  };

  const selectToRemove = (id: string) => {
    setSelected(id);
    setShowModal(true);
  };

  const cancelSelection = () => {
    setSelected(null);
    setShowModal(false);
  };

  const deleteMeet = async () => {
    try {
      if(!selected){
        return;
      }

      await meetServices.deleteMeet(selected);
      await getMeets();
      cancelSelection();
    } catch (error) {
      console.log("Ocorreu um erro ao deletar a reunião: ", error);
    }
  }
 
  return (
    <>
      <div className="container-meet-list">
        {meets && meets.length > 0 ? (
          meets.map((meet: any) => (
            <MeetListItem
              meet={meet}
              selectToRomove={selectToRemove}
              key={meet.id}
            />
          ))
        ) : (
          <div className="empty">
            <img src={emptyicon} alt="emptyIcon" />
            <p>Você ainda não possui reuniões criadas :(</p>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="container-modal"
      >
        <Modal.Body>
          <div className="content">
            <div className="container">
              <span>Deletar reunião</span>
              <p>Deseja deletar a reunião?</p>
              <p>Essa ação não poderá ser desfeita</p>

            </div>
            <div className="actions">
              <span onClick={cancelSelection}>Cancelar</span>
              <button onClick={deleteMeet}>Confirmar</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
