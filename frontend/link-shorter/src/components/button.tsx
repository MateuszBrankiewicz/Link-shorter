interface Props{
    msg:String;
    onClick : () =>void
}
const Button: React.FC<Props> = ({msg, onClick}:Props) => {
    const handleClick = () => {
        if (onClick) {
          onClick();
        }
      };
    return(
        <button onClick={handleClick}>{msg}</button>
    )
}
export default Button