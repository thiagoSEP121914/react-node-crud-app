import InputAdornment from "@mui/material/InputAdornment";
import "../style/Header.css"
import TextField from '@mui/material/TextField';
import { CiSearch } from "react-icons/ci";
import NavButton from "./NavButton";
import { CiBellOn } from "react-icons/ci";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { GiHamburgerMenu } from "react-icons/gi";


function Header (props) {
    const date = new Date().toLocaleDateString()

    return (
        <>
            <header className="header">
                <div className = "hamburguer-button" onClick={props.onToggleMenu}>
                     <GiHamburgerMenu
                    size={30}
                />
                </div>
                <div className="useInfo">
                    <h2>Welcome {props.name || "User"}</h2>
                     <p>{date}</p>
                </div>
                <div className="h-container">
                    <TextField 
                        id="outline-basic" 
                        variant="outlined"
                        placeholder="Pesquisar"
                        size="normal"
                        sx= {
                            {
                                backgroundColor:"#FFF",
                                width:"50%"
                            }
                        }
                        slotProps={{
                            input: {
                                 startAdornment: (
                                    <InputAdornment>
                                        <CiSearch/>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {/* Talvez seja melhor refatorar o NavButton. */}
                    <div id="bell">
                        <CiBellOn/>
                    </div>
                    <Avatar sx={{bgcolor: deepOrange[500],
                        width:50,
                        height:50
                    }}>H</Avatar>
                </div>
            </header>
        </>
    )
}

export default Header;