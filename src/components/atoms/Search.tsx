import search from "../../assets/Search.svg";

interface SearchProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Search = ({ placeholder, onChange, value }: SearchProps) => {
  return (
    <div className="relative ">
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="bg-transparent text-typography-dark border-2 py-1 border-typography-light rounded-sm flex-row-reverse flex  outline-none ps-8"
        type="text"
      />
      <img
        className="w-4 absolute top-[50%] left-2 -translate-y-[50%]"
        src={search}
        alt={""}
      />
    </div>
  );
};
export default Search;
