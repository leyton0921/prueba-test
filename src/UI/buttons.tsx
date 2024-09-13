export  interface IbuttonProps{
    label: string;
    onClick:()=>void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<IbuttonProps> = ({ onClick, label, className }) => {
    return (
      <button type="submit" onClick={onClick} className={className}>
        {label}
      </button>
    );
  };
  
  export default Button;