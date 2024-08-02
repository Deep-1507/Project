
export const Inputbox = ({label,placeholder,onChange}) => {
    return (
      <div>
        <div className="font-semibold pt-4 text-lg">
            {label}
        </div>
        <input type="text" placeholder={placeholder} onChange={onChange} className="border-2 w-full h-14 p-4 text-lg hover:border-4 hover:border-customGreen" />
      </div>
    );
  };
  