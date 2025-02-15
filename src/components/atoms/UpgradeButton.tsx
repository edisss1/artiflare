import Button from "./Button"

const UpgradeButton = ({ isHidden }: { isHidden?: string }) => {
    return (
        <Button
            onClick={() => {}}
            className={`capitalize px-2 py-1 ${isHidden}  text-typography-light bg-secondary  rounded-lg  `}
        >
            upgrade
        </Button>
    )
}
export default UpgradeButton
