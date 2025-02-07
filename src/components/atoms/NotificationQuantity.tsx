interface NotificationQuantityProps {
    quantity: number
}

const NotificationQuantity = ({ quantity }: NotificationQuantityProps) => {
    return (
        <div className="absolute right-[70%] pointer-events-none top-1/2 bg-danger flex items-center justify-center rounded-full text-typography-dark text-xs w-4 h-4">
            <span>{quantity}</span>
        </div>
    )
}
export default NotificationQuantity
