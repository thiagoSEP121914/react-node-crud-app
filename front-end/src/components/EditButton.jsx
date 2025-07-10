import { useNavigate } from "react-router-dom";
import "../style/EditButton.css";
import { MdModeEdit } from "react-icons/md";

function EditButton({ to , editMode}) {
  
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(to, { state: {editMode: editMode}});
  }


  return (
    <button className="edit-button" onClick={handleEdit}>
      <MdModeEdit 
      color="#33d9b2" 
      size={20}
      />
    </button>
  );
}

export default EditButton;
