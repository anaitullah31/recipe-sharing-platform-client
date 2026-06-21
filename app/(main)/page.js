import ChefStorySection from "../components/ChefStorySection";
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
      <ChefStorySection />
    </div>
  );
};

export default HomePage;
