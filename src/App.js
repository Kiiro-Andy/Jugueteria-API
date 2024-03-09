import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Edit from './componentes/Edit';
import Show from './componentes/Show';
import Create from './componentes/Create';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Show /> }/>
          <Route path='/create' element={ <Create /> }/>
          <Route path='/edit/:id' element={ <Edit /> }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
