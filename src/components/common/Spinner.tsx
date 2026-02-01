import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="">
      <FaSpinner
        size={40}
        className="border-solid border-black border-opacity-10 w-100 h-100 rounded-full border-left-0 border-t09f animate-spin"
      />
    </div>
  );
};

export default Spinner;