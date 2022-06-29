import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  return <div className="d-flex flex-column min-vh-100">
    {code ? <Dashboard code={code}/> : <Login/>}
    <Footer/>
  </div>

}

export default App;
