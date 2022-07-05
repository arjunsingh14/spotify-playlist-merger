import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import useAuth from "./hooks/useAuth";
function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  const token = useAuth(code);
  return <div className="d-flex flex-column min-vh-100">
    {token ? <Dashboard token = {token}/> : <Login/>}
    <Footer/>
  </div>

}

export default App;
