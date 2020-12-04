import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BudgetViewPage from "./pages/BudgetViewPage";
import EditBudgetPage from "./pages/EditBudgetPage";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="py-3">
        <Container>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/budget/view" exact component={BudgetViewPage} />
          <Route path="/budget/update" exact component={EditBudgetPage} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
