
import "../style/DeleteButton.css";
import { MdDeleteForever } from "react-icons/md";

function DeleteButton({onDelete}) {

  return (
    <button className="delete-button" onClick={onDelete}>
      <MdDeleteForever color="#b33939"  
        size={20}
      />
    </button>
  );
}

export default DeleteButton;
