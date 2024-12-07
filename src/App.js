
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';  // The new MovieDetail component to display movie info

function App() {
  return (
 
      <div className="App">
        <Routes>
          {/* Home Page with Search and Movie List */}
          <Route exact path="/" element={<SearchBar/>} />

          {/* Movie Detail Page */}
          <Route path="/movie/:id" element={<MovieDetails/>} />
        </Routes>
      </div>
   
  );
}

export default App;
