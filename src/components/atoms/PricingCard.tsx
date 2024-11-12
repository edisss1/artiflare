import { Link } from "react-router-dom";

type PricingCardProps = {
  planName: string;
  price: string | number;
  features: string[];
  signUpWith: string;
  paymentLink?: string | undefined;
  isFree: boolean;
};

const PricingCard = ({
  planName,
  price,
  features,
  signUpWith,
  paymentLink,
  isFree,
}: PricingCardProps) => {
  return (
    <div className="w-full max-w-[320px] bg-primary dark:bg-primary-dark dark:text-typography-dark p-4 min-h-[400px] rounded-sm">
      <div className="w-full flex flex-col gap-2">
        <h4>{planName}</h4>
        <div className="flex">
          <p>
            {price !== "Free" && "$"}
            {price}
          </p>
          {price !== "Free" && <span>/month</span>}
        </div>
        {isFree ? (
          <Link
            className="bg-secondary text-typography-light py-3 text-center"
            to={"/auth/login"}
          >
            Start for free
          </Link>
        ) : (
          <a
            href={paymentLink}
            target="_blank"
            className="bg-secondary py-3 text-center text-typography-light"
          >
            {signUpWith}
          </a>
        )}
      </div>
      <ul className="list-disc mt-4 ml-4">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};
export default PricingCard;
