type InformationTextProps = {
  header: string;
  text: string;
};

const InformationText = ({ header, text }: InformationTextProps) => {
  return (
    <div className="w-full max-w-max text-center gap-4 flex flex-col items-center ">
      <h3 className="font-medium text-xl block w-fit">{header}</h3>
      <p className="max-w-[300px] text-lg font-normal">{text}</p>
    </div>
  );
};
export default InformationText;
