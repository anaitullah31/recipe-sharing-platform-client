import FeaturedSection from "../components/FeaturedSection";
import PopularRecipesSection from "../components/PopularRecipesSection";
import RecipeHero from "../components/RecipeHero";
import TechniqueSection from "../components/TechniqueSection";

const HomePage = () => {
  return (
    <div>
      <RecipeHero />
      <FeaturedSection />
      <PopularRecipesSection />
      <TechniqueSection />
    </div>
  );
};

export default HomePage;
