import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="py-3">
        <Container>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
