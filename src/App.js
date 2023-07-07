import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/Nav';
import Home from './components/Home';
import AllActivity from './components/AllActivity';
import Category from './components/Category';
import EditEntry from './components/EditEntry';
import MakeEntry from './components/MakeEntry';
import ShowEntry from './components/ShowEntry';

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
      </Routes>
    </Router>


  );
}

export default App;