import "./App.css";
import PDFTableComponent from "./components/PDFTableComponent";

function App() {
  return (
    <div className="App">
      <nav
        className="navbar p-3 shadow-sm"
        style={{ backgroundColor: "#FDFFD0", marginBottom: "55px" }}
      >
        <div className="container-fluid">
          <span
            className="navbar-brand mb-0 h1 m-auto"
            style={{ fontSize: "1.4em", letterSpacing: "1px" }}
          >
            Invoice Intelligence Platform
          </span>
        </div>
      </nav>
      <PDFTableComponent />

      <hr className="featurette-divider mb-0"></hr>
    </div>
  );
}

export default App;
