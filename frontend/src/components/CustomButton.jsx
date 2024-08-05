export function CustomButton({label, onClick}) {
    return <button onClick={onClick} type="button" className="w-full text-white bg-walmartBlue hover:bg-blue-500 focus:outline-none cursor-pointer focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}
  