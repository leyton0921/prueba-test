export interface IinputProps{
    label: string;
    type: string;
    placeholder: string;
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name:string
}

const Input: React.FC<IinputProps> = ({  type, placeholder, id, value, onChange, className,name}) => {
    return (
        <div className={className}>

            <input 
                type={type} 
                placeholder={placeholder}
                id={id} 
                name={name}
                value={value} 
                onChange={onChange} 
                className={className}
              

            />
        </div>
    );
}

export default Input;