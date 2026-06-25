import Reveal from "../components/animations/Reveal";
import ChefStorySection from "../components/ChefStorySection";
import FeaturedSection from "../components/FeaturedSection";
import PopularRecipesSection from "../components/PopularRecipesSection";
import RecipeHero from "../components/RecipeHero";
import TechniqueSection from "../components/TechniqueSection";

const HomePage = () => {
  return (
    <div>
      <Reveal>
        <RecipeHero />
      </Reveal>

      <Reveal delay={0.1}>
        <FeaturedSection />
      </Reveal>

      <Reveal delay={0.1}>
        <PopularRecipesSection />
      </Reveal>

      <Reveal delay={0.1}>
        <TechniqueSection />
      </Reveal>

      <Reveal delay={0.1}>
        <ChefStorySection />
      </Reveal>
    </div>
  );
};

export default HomePage;
