import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HQYGQIxqPrwjtY2QYPp1VEkulH6V1m44TKU5EkCwpDb8elgyAwPSHYksmPmbHneEAgXdWA8XOAGWnLDW5yKMHwS00VBtT946l"
);

export { stripePromise };
