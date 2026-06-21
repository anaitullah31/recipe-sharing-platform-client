import FeaturedSection from "../components/FeaturedSection";
import PopularRecipesSection from "../components/PopularRecipesSection";
import RecipeHero from "../components/RecipeHero";

const HomePage = () => {
  return (
    <div>
      <RecipeHero />
      <FeaturedSection />
      <PopularRecipesSection />
    </div>
  );
};

export default HomePage;
