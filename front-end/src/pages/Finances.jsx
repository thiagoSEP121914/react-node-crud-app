import financeImg from "../assets/piggy-bank.png"

function Finances () {
    return (
        <div>
            <img src={financeImg} alt="beautifull pig image" 
                style={{
                    width:"300px"
                }}
            />
        </div>
    );
}

export default Finances;