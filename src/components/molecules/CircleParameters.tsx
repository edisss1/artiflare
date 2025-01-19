import SettingsInput from "../atoms/SettingsInput.tsx"
import Button from "../atoms/Button.tsx"

interface CircleParametersProps {
    circleDiameterValue: string | number
    circleFillValue: string
    circleStrokeValue: string
    onClick: () => void
    onChangeDiameter: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeFill: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeStroke: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CircleParameters = ({
    circleDiameterValue,
    circleFillValue,
    circleStrokeValue,
    onClick,
    onChangeDiameter,
    onChangeStroke,
    onChangeFill
}: CircleParametersProps) => {
    return (
        <div className="flex flex-col gap-2 items-center ">
            <SettingsInput
                value={circleDiameterValue}
                onChange={onChangeDiameter}
                type="number"
                id="Diameter"
                label="Diameter"
            />
            <SettingsInput
                value={circleFillValue}
                onChange={onChangeFill}
                id="color"
                label="Color"
                type="color"
                className="bg-transparent outline-none border-none w-8 "
            />
            <SettingsInput
                value={circleStrokeValue}
                onChange={onChangeStroke}
                id="stroke"
                label="stroke"
                type="color"
                className="bg-transparent outline-none border-none w-8 "
            />
            <Button
                className="border-2 border-typography-light mt-4 py-2 px-4 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
                children="Delete"
                onClick={onClick}
            />
        </div>
    )
}
export default CircleParameters
