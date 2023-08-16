import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Entry Point to the App */}
          {/* Normally the navigation goes here, I can handle if you guys need me to */}
            <Route path = "/" Component={Home} />
            <Route path = "/header" Component={Header} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
