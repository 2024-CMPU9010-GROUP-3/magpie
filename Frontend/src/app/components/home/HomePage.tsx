import LocationAggregatorMap from "../map/MapboxMap";
import ProtectedRoute from "../ProtectedRoute";
import CookieBanner from '@/app/components/banner/CookieBanner';


const HomePage = () => {
  return (
      <ProtectedRoute>
        <LocationAggregatorMap />
      </ProtectedRoute>
  );
};

export default HomePage;
