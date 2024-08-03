
export const Inputbox = ({label,placeholder,onChange}) => {
    return (
      <div>
        <div className="font-semibold pt-4 text-sm m-2">
            {label}
        </div>
        <input type="text" placeholder={placeholder} onChange={onChange} className="border-2 border-black rounded-md w-full h-10 p-4 text-lg hover:border-4 hover:walmartYellow" />
      </div>
    );
  };
  