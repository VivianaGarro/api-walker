import { Routes, Route } from 'react-router-dom';
import './App.css';
import Form from './componentes/Form';
import People from './componentes/People';
import Planets from './componentes/Planets';

function App() {
  return (
    <div className="App">
      <Form></Form>
      <Routes>
      <Route path="/people/:id" element={<People></People>}></Route>
      <Route path="/planets/:id" element={<Planets></Planets>}></Route>
      </Routes>
    </div>
  );
}

export default App;
