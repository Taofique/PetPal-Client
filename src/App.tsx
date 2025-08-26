import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetList from './components/PetList';
import PetProfile from './components/PetProfile';
import PetForm from './components/PetForm';
import EditPetForm from './components/EditPetForm';
import Feed from './components/Feed';
import SitterSwap from './components/SitterSwap';
import TrendingPets from './components/TrendingPets';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pets/:id" element={<PetProfile />} />
          <Route path="/pets/:id/edit" element={<EditPetForm />} />
          <Route path="/add-pet" element={<PetForm />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/sitter" element={<SitterSwap />} />
          <Route path="/trending" element={<TrendingPets />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
