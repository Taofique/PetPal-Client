import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PetList from './components/PetList';
import PetProfile from './components/PetProfile';
import PetForm from './components/PetForm';
import Feed from './components/Feed';
import SitterSwap from './components/SitterSwap';
import TrendingPets from './components/TrendingPets';
import EditPetForm from './components/EditPetForm';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add-pet">Add Pet</Link> | <Link to="/feed">Feed</Link> |{' '}
        <Link to="/sitter">Sitter Swap</Link> | <Link to="/trending">Trending Pets</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/pets/:id" element={<PetProfile />} />
        <Route path="/pets/:id/edit" element={<EditPetForm />} />
        <Route path="/add-pet" element={<PetForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/sitter" element={<SitterSwap />} />
        <Route path="/trending" element={<TrendingPets />} />
      </Routes>
    </Router>
  );
};

export default App;
