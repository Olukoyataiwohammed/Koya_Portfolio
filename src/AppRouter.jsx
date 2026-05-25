import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Projects from './Projects';
import Header from './Header';
import SearchBox from "./SearchBox"

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/searchBox' element={<SearchBox />} />
      </Routes>
    </>
  );
};

export default AppRouter;