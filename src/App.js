import './App.css';

function App() {
  return (
    <div data-test-id="guest">
      <h1>React Guest List</h1>
      <form className="form">
        <div className="labels">
          <div className="name">
            <label htmlFor="firstname"> First Name </label>
            <input type="text" id="firstname" className="input" />
          </div>
          <div className="name">
            <label htmlFor="lastname"> Last Name </label>
            <input type="text" id="lastname" className="input" />
          </div>
        </div>
        <div className="checknbtn">
          <div className="check">
            <input type="checkbox" id="checkbox" className="box" />
            <label htmlFor="checkbox"> Attending </label>
          </div>
          <button className="remove"> Remove </button>
        </div>
      </form>
    </div>
  );
}

export default App;
