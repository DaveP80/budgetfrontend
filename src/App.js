import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/Nav';
import Home from './components/Home';
import AllActivity from './components/AllActivity';
import Category from './components/Category';
import EditEntry from './components/EditEntry';
import MakeEntry from './components/MakeEntry';
import ShowEntry from './components/ShowEntry';
import ErrorPage from './components/ErrorPage';
import InvalidReq from './components/InvalidReq';

function App() {
  return (

      <Router>
      <Nav/>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/transactions' element={<AllActivity />}/>
        <Route path='/transactions/:id' element={<ShowEntry />}/>
        <Route path='/transactions/new' element={<MakeEntry />}/>
        <Route path='/transactions/:id/edit' element={<EditEntry />}/>
        <Route path='/transactions/category' element={<Category />}/>
        <Route path='/notfound' element={<ErrorPage />}/>
        <Route path='/err-cannotmodify' element={<InvalidReq />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </Router>


  );
}

export default App;