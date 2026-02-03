import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="">
      <FaSpinner
        size={20}
        className="border-solid border-black border-opacity-10 rounded-full border-left-0 border-t09f animate-spin"
      />
    </div>
  );
};

export default Spinner;