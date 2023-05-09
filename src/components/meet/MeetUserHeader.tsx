import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/images/plusSquare.svg'

export const MeetUserHeader = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem('name') || '';

  const mobile = window.innerWidth <= 992;
  const navigateToAdd = () => {
    navigate('/add');
  }
  return (
    <div className="container-user-header">
      <span>Minhas reuniões</span>

      <div>
        <p>Olá, {name}</p>
        {!mobile && 
        <img src={addIcon} alt="Adicionar Reunião" onClick={navigateToAdd}/>
        }
      </div>
    </div>
  );
};
