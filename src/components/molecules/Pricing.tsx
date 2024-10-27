import PricingCard from "../atoms/PricingCard"

const Pricing = () => {
  const pricingPlans = [
    {
      tier: "Basic",
      price: "Free",
      signUpWith: "Start for free",
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
    },
    {
      tier: "Pro",
      price: 9.99,
      signUpWith: "Sign Up with Proffesional",
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
    },
    {
      tier: "Enterprise",
      price: 25.99,
      signUpWith: "Sign Up with Enterprise",
      paymentLink: "https://buy.stripe.com/test_3cscOJ5DweS03ok5kl",
      isFree: false,
      features: [
        "Unlimited teams",
        "Unlimited Projects",
        "Premium Drawing Tools",
        "Custom Branding",
        "100GB Cloud Storage",
      ],
    },
  ]

  return (
    <div className="flex min-h-[300px] text-typography-light mb-4 flex-col gap-4 w-full items-center mt-[clamp(1rem,40vh,4rem)]">
      <h3>Pricing</h3>
      <div className="flex gap-4 w-full justify-center flex-wrap ">
        {pricingPlans.map((plan) => (
          <PricingCard
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
  )
}
export default Pricing
