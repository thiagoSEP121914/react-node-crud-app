import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import estados from "../services/BrazilianStates";

export function ComboBox(props) {
    
    return (
        <Autocomplete
            disablePortal
            options={estados}
            value={props.value}
            renderInput={(params) => <TextField {...params} 
                label = {props.label}
                fullWidth
            />}
        />
    );
}