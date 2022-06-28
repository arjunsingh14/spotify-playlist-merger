import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Dashboard from "./pages/Dashboard";
function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  return code ? <Dashboard code={code}/> : <Login/>
}

export default App;
