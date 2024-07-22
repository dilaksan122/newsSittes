import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import News from './Components/News/News';
import Cinema from './Components/Cinema/Cinema';
import Sports from './Components/Sports/Sports';
import Reviews from './Components/Reviews/Reviews';
import Festival from './Components/Festival/Health';
import SportsDetail from './Components/Sports/SportsDetail';
import CinemaDetails from './Components/Cinema/CinemaDetails';
import Technology from './Components/Cartoons/Technology';
import TechnologyDetail from './Components/Cartoons/TechnologyDetail';
import HealthDetail from './Components/Festival/HealthDetail';
import ReviewsDetail from './Components/Reviews/ReviewsDetail';
import Health from './Components/Festival/Health';
import Privacy from './Components/Privacy/Privacy';
import Contact from './Components/Contact/Contact';
import NewsLetter from './Components/NewsLetter/NewsLetter';


function App() {
  return (
    <Router>
    <Header />
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/cinema/:id" element={<CinemaDetails />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/:id" element={<SportsDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:id" element={<ReviewsDetail/>} />
          <Route path="/health" element={<Health />} />
          <Route path="/health/:id" element={<HealthDetail/>} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/technology/:id" element={<TechnologyDetail />} />
          <Route path='/privacy-policy' element={<Privacy/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/newsLetter' element={<NewsLetter/>}/>
        
        </Routes>
  </Router>
  );
}

export default App;
