interface PrivacyPolicySectionProps {
    title: string
    content: string[]
}

const PrivacyPolicySection = ({
    title,
    content
}: PrivacyPolicySectionProps) => {
    return (
        <div className="flex flex-col gap-2 w-full ">
            <h2 className="font-medium text-lg">{title}</h2>
            {content.length > 1 ? (
                <ul className="list-disc">
                    {content.map((item) => (
                        <li className="ml-6" key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{content[0]}</p>
            )}
        </div>
    )
}
export default PrivacyPolicySection
