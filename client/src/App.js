import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from './components/Navbar.js'
import { Home } from './pages/Home.js'
import { CreateRecipe } from './pages/Create-recipe.js'
import { SavedRecipes } from './pages/Saved-recipes.js'
import { Auth } from './pages/Auth.js'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;