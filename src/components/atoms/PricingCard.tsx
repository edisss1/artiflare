import { Link } from "react-router-dom";

type PricingCardProps = {
  planName: string;
  price: string | number;
  features: string[];
  signUpWith: string;
  paymentLink?: string | undefined;
  isFree: boolean;
  gradient: string;
};

const PricingCard = ({
  planName,
  price,
  features,
  signUpWith,
  paymentLink,
  isFree,
  gradient,
}: PricingCardProps) => {
  return (
    <div
      className={`w-full max-w-[320px] dark:text-typography-light relative ${gradient} rounded-md bg-primary dark:bg-primary-dark dark:text-typography-dark p-8 min-h-[400px] `}
    >
      <div className="w-full flex flex-col gap-2">
        <h4 className={"text-3xl font-medium"}>{planName}</h4>
        <div className="flex">
          <span className={"self-end font-medium text-lg"}>$</span>
          <span
            className={"text-[clamp(1.5rem,30vw,3rem)] self-end h-[3.5rem]"}
          >
            {price}
          </span>
        </div>
      </div>
      <ul className="list-disc mt-4 ml-4">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {isFree ? (
        <Link
          className="bg-secondary absolute bottom-7 left-8 text-typography-light py-3 text-center px-2 rounded-md hover:outline hover:outline-primary transition-all duration-150"
          to={"/auth/login"}
        >
          Start for free
        </Link>
      ) : (
        <a
          href={paymentLink}
          target="_blank"
          className="bg-secondary absolute bottom-7 left-8 py-3 text-center text-typography-light px-2 rounded-md hover:outline hover:outline-primary transition-all duration-150"
        >
          {signUpWith}
        </a>
      )}
    </div>
  );
};
export default PricingCard;
