import logo from './logo.svg';
import './App.css';
import MovieForm from './Components/movieform';
import Feedback from './Components/feedback';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { Routes, Link, Route } from "react-router-dom"
function App() {
  return ( 
    <Container>
    <nav>
      <ul>
        <li><Link to='/'>Movies</Link></li>
        <li><Link to='/feedback'>FEEDBACK</Link></li>
      </ul>
    </nav>
<Routes>
    <Route path='/' element={<MovieForm />}/>
    <Route path='/feedback' element={<Feedback />}/>
</Routes>
  </Container> )
}

export default App;
