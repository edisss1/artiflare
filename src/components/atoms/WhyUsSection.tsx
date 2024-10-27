type WhyUsSectionProps = {
  header: string
  text: string
}

const WhyUsSection = ({ header, text }: WhyUsSectionProps) => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-[250px] gap-4">
      <h4 className="font-medium text-xl">{header}</h4>
      <p>{text}</p>
    </div>
  )
}
export default WhyUsSection
