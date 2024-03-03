import "./App.css";
import Info from "./Info.jsx";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    setInput(e.target.cityName.value);
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="searchField">
            <form onSubmit={handleSubmit}>
              <input name="cityName" type="cityName" />
              <button>Submit</button>
            </form>
          </div>
          <Info nameCity={input} />
        </div>
      </div>
    </>
  );
}

export default App;
