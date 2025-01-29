type InformationImageProps = {
    src: string
}

const InformationImage = ({ src }: InformationImageProps) => {
    return (
        <img
            src={src}
            className="max-w-[300px] h-full max-h-[200px] rounded-sm w-full object-cover aspect-[1.5/1]"
            alt={"/"}
            loading="lazy"
        />
    )
}
export default InformationImage
