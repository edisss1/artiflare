import SettingsInput from "../atoms/SettingsInput.tsx"

interface LineParametersProps {
    lineStrokeValue: string
    lineWidthValue: string | number
    lineAngleValue: number
    onChangeWidth: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeStroke: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeAngle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LineParameters = ({
    lineStrokeValue,
    lineWidthValue,
    lineAngleValue,
    onChangeStroke,
    onChangeWidth,
    onChangeAngle
}: LineParametersProps) => {
    return (
        <div className={"flex gap-2 items-center"}>
            <SettingsInput
                type="number"
                value={lineWidthValue}
                onChange={onChangeWidth}
                id="width"
                label="Width"
            />
            <SettingsInput
                type="number"
                onChange={onChangeAngle}
                value={lineAngleValue}
                id={"angle"}
                label={"Angle"}
            />
            <SettingsInput
                type="color"
                onChange={onChangeStroke}
                value={lineStrokeValue}
                id={"stroke"}
                label={"Stroke"}
            />
        </div>
    )
}
export default LineParameters
