import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Entry Point to the App */}
          {/* Normally the navigation goes here, I can handle if you guys need me to */}
            <Route path = "/" Component={Home} />
            <Route path = "/header" Component={Header} />
            <Route path = "/profile" Component={UserProfile} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
