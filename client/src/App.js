import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BudgetViewPage from "./pages/BudgetViewPage";
import EditBudgetPage from "./pages/EditBudgetPage";
import EditBudgetItemPage from "./pages/EditBudgetItemPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import ViewTransactionsPage from "./pages/ViewTransactionsPage";
import EditTransactionPage from "./pages/EditTransactionPage";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="py-3">
        <Container>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/budget/view" exact component={BudgetViewPage} />
          <Route path="/budget/categories" exact component={AddCategoryPage} />
          <Route path="/budget/update" exact component={EditBudgetPage} />
          <Route
            path="/budget/edit-item/:itemtype/:budgetid/:itemid"
            exact
            component={EditBudgetItemPage}
          />
          <Route
            path="/transactions/new"
            exact
            component={CreateTransactionPage}
          />
          <Route
            path="/transactions/all"
            exact
            component={ViewTransactionsPage}
          />
          <Route
            path="/transaction/edit/:id"
            exact
            component={EditTransactionPage}
          />
          <Route path="/" exact component={HomePage} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
