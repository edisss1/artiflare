import PricingCard from "../atoms/PricingCard";

const Pricing = () => {
  const pricingPlans = [
    {
      tier: "Basic",
      price: 0,
      signUpWith: "Get started",
      isFree: true,
      features: [
        "1 Team",
        "3 Active Projects",
        "Basic Drawing Tools",
        "Export as PNG",
        "Limited Cloud Storage",
        "Basic Collaboration",
        "Watermark on Exports",
      ],
      gradient: "bg-gradient-to-br from-[#F5E7F8] to-[#BBDCE3]",
    },
    {
      tier: "Pro",
      price: 9.99,
      signUpWith: "Upgrade now",
      isFree: false,

      paymentLink: "https://buy.stripe.com/test_00g7up2rk4dm4so6oo",
      features: [
        "5 Teams",
        "Unlimited Projects",
        "Advanced Drawing Tools",
        "Export Options",
        "500MB Cloud Storage",
        "Advanced Collaboration",
      ],
      gradient: "bg-gradient-to-br from-[#C2FAE6] to-[#E7F5BE]",
    },
    {
      tier: "Enterprise",
      price: 25.99,
      signUpWith: "Contact us",
      paymentLink: "https://buy.stripe.com/test_3cscOJ5DweS03ok5kl",
      isFree: false,
      features: [
        "Unlimited teams",
        "Unlimited Projects",
        "Premium Drawing Tools",
        "Custom Branding",
        "100GB Cloud Storage",
      ],
      gradient: "bg-gradient-to-br from-[#AAB8FF] to-[#FFBEE9]",
    },
  ];

  return (
    <div className="flex min-h-[300px]   text-typography-light mb-4 flex-col gap-4 w-full items-center mt-[clamp(1rem,40vh,4rem)]">
      <h3 className={"text-3xl font-medium"}>Pricing</h3>
      <div className="flex gap-4 w-full justify-center flex-wrap ">
        {pricingPlans.map((plan) => (
          <PricingCard
            gradient={plan.gradient}
            isFree={plan.isFree}
            key={plan.tier}
            planName={plan.tier}
            price={plan.price}
            features={plan.features}
            signUpWith={plan.signUpWith}
            paymentLink={plan.paymentLink}
          />
        ))}
      </div>
    </div>
  );
};
export default Pricing;
