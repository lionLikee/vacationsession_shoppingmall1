import {Home} from "./pages/Home";
import {Item} from "./pages/Item";
import {Members} from "./pages/Members";
import {Orders} from "./pages/Orders";
import {Routes,Route} from "react-router-dom";
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/item' element={<Item/>}/>
      <Route path='/members' element={<Members/>}/>
      <Route path='/orders' element={<Orders/>}/>
    </Routes>
    
  );
}
export default App;
