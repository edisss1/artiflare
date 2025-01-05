import SettingsInput from "../atoms/SettingsInput.tsx"
import Button from "../atoms/Button.tsx"

interface RectParametersProps {
    type: string
    name: string
    rectWidthValue: string | number
    onChangeWidth: (e: React.ChangeEvent<HTMLInputElement>) => void
    rectHeightValue: string | number
    onChangeHeight: (e: React.ChangeEvent<HTMLInputElement>) => void
    rectFillValue: string
    onChangeFill: (e: React.ChangeEvent<HTMLInputElement>) => void
    rectStrokeValue: string
    onChangeStroke: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
    onChangePathScaleX: (e: React.ChangeEvent<HTMLInputElement>) => void
    pathScaleValueX: number
    onChangePathScaleY: (e: React.ChangeEvent<HTMLInputElement>) => void
    pathScaleValueY: number
}

const RectParameters = ({
    type,
    name,
    rectWidthValue,
    rectFillValue,
    rectStrokeValue,
    rectHeightValue,
    onChangeHeight,
    onChangeStroke,
    onChangeFill,
    onChangeWidth,
    onClick,
    onChangePathScaleX,
    pathScaleValueX,
    onChangePathScaleY,
    pathScaleValueY
}: RectParametersProps) => {
    return (
        <div className="flex gap-2 items-center">
            {type === "rect" && (
                <>
                    <SettingsInput
                        type="number"
                        value={rectWidthValue}
                        onChange={onChangeWidth}
                        id="width"
                        label="Width"
                    />
                    <SettingsInput
                        value={rectHeightValue}
                        onChange={onChangeHeight}
                        id="height"
                        label="Height"
                        type="number"
                    />
                    <div className="flex gap-4">
                        <SettingsInput
                            value={rectFillValue}
                            onChange={onChangeFill}
                            id="color"
                            label="Color"
                            type="color"
                            className=""
                        />
                        <SettingsInput
                            value={rectStrokeValue}
                            onChange={onChangeStroke}
                            id="stroke"
                            label="Stroke"
                            type="color"
                            className="color-swatch"
                        />
                    </div>
                </>
            )}

            {[
                "predefined-process",
                "documents",
                "database",
                "direct-data"
            ].includes(name) && (
                <>
                    <SettingsInput
                        value={pathScaleValueX}
                        onChange={onChangePathScaleX}
                        id="path-width"
                        label="Path Width"
                        type="number"
                    />
                    <SettingsInput
                        value={pathScaleValueY}
                        onChange={onChangePathScaleY}
                        id="path-height"
                        label="Path Height"
                        type="number"
                    />
                </>
            )}
            <Button
                className="border-2 border-typography-light mt-4 py-2 px-4 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
                children="Delete"
                onClick={onClick}
            />
        </div>
    )
}

export default RectParameters
