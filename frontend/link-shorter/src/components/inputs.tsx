import { useState } from 'react';
import "../styles/inputs.css"
interface Props {
  msg: string;
  option: string;
}

const Input = ({ msg, option }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    
      <form>
        <input type={option} placeholder={msg} value={inputValue} onChange={handleInputChange} />
      </form>
  
  );
};

export default Input;
