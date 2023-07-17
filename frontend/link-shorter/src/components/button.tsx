interface Props{
    msg:String;
}
const Button = ({msg}:Props) => {
    return(
        <button>{msg}</button>
    )
}
export default Button