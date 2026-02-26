import AboutContainer from "@/containers/about/AboutContainer";
import BeliefsContainer from "@/containers/beliefs/BeliefsContainer";
import HeroContainer from "@/containers/hero/HeroContainer";
import PricingContainer from "@/containers/pricing/PricingContainer";

export default function Home() {
  return (
    <>
      <HeroContainer />
      <AboutContainer />
      <BeliefsContainer />
      <PricingContainer />
    </>
  );
}
