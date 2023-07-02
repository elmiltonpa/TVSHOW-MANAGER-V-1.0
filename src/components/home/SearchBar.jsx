import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { TiDelete } from "react-icons/ti";

const SearchBar = () => {
  const [text, setText] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const searchValue = searchParams.get("s") || "";
    setText(searchValue);
  }, [searchParams]);

  const onChangeSearch = (event) => {
    navigate("/home?s=" + event.target.value, { replace: true });
  };

  const clearInput = () => {
    setText("");
    onChangeSearch({ target: { value: "" } });
  };

  return (
    <div className="w-full h-16 flex justify-center items-center">
      <div className="relative w-[30%]">
        <input
          className=" placeholder-negro border-2  border-purpuraclaro w-full px-3 h-10 text-negro text-xl"
          value={text}
          type="text"
          placeholder="Buscar algo para ver..."
          onChange={(e) => {
            setText(e.target.value);
            onChangeSearch(e);
          }}
        />

        {text && (
          <button
            className="absolute right-2 text-2xl text-rojo font-bold top-1/2 transform -translate-y-1/2"
            onClick={clearInput}
          >
            <TiDelete size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
