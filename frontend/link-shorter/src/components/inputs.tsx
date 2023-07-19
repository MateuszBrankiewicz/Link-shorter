import { ChangeEvent, useState } from 'react';
import "../styles/inputs.css"
interface Props {
  msg: string;
  option: string;
  inputValue: string;
  onChange:(event : ChangeEvent<HTMLInputElement>) =>void;
}

const Input: React.FC<Props> = ({ msg, option,inputValue,onChange }: Props) => {
  

  return (
    
      <form>
        <input type={option} placeholder={msg} value={inputValue} onChange={onChange} />
      </form>
  
  );
};

export default Input;
