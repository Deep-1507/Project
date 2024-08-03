export function CustomButton({label, onClick}) {
    return <button onClick={onClick} type="button" class="w-full text-white bg-walmartBlue hover:bg-customGreen focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}
  