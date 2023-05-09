import { useEffect, useState } from "react";
import emptyicon from '../../assets/images/emptyList.svg'
import { MeetServices } from "../../services/MeetServices";
import { MeetListItem } from "./MeetListItem";


const meetServices = new MeetServices();

export const MeetList = () => {

  const [meets, setMeets] = useState([]);

  useEffect(() => {
    getMeets();
  }, [])

  const getMeets = async () => {
    try {
      const result = await meetServices.getMeets();
      if(result?.data){
        setMeets(result.data);
      }
      
    } catch (error) {
      console.log("Ocorreu um erro ao listar as reuniões: ", error)
    }
  }

  const selectToRemove = () => {

  }
  return(
    <div className="container-meet-list">

      {meets && meets.length > 0 
      ?
      meets.map((meet: any) => (
        <MeetListItem meet={meet} selectToRomove={selectToRemove} key={meet.id}/>
      ))
      :
        <div className="empty">
          <img src={emptyicon} alt="emptyIcon" />
          <p>Você ainda não possui reuniões criadas :(</p>
        </div>
      }
    </div>
  )
}