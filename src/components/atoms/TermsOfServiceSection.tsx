interface TermsOfServiceSectionProps {
    title: string
    content: string
}

const TermsOfServiceSection = ({
    title,
    content
}: TermsOfServiceSectionProps) => {
    return (
        <div className="flex flex-col gap-4 items-start  mt-4">
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="">{content}</p>
        </div>
    )
}
export default TermsOfServiceSection
