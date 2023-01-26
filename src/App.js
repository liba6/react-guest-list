import './App.css';
import { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendingStatus, setAttendingStatus] = useState('not Attending');
  const guests = [];
  const [updatedGuestsList, setUpdatedGuestsList] = useState(guests);
  // const newState = [...updatedGuestsList];
  // const [removedGuestList, setRemovedGuestList] = useState(newState);

  function addGuests() {
    setUpdatedGuestsList((prevSelected) => [...prevSelected, guests]);
  }
  const onEnterChange = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      guests.push(firstName + ' ' + lastName + ' ' + attendingStatus);
      addGuests();
    }
  };
  function removeGuest() {
    newState.pop();
    setRemovedGuestList(newState);
    return removedGuestList;
    console.log(removedGuestList);
  }

  return (
    <div data-test-id="guest" className="pic">
      <h1>React Guest List</h1>
      <form className="form">
        <div className="labels">
          <div className="name">
            <label htmlFor="firstname"> First Name </label>
            <input
              id="firstname"
              className="input"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="name">
            <label htmlFor="lastname"> Last Name </label>
            <input
              id="lastname"
              className="input"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onKeyDown={onEnterChange}
            />
          </div>
        </div>
        <div className="checknbtn">
          <div className="check">
            <input
              type="checkbox"
              id="checkbox"
              className="box"
              onClick={() => setAttendingStatus('Attending')}
            />
            <label htmlFor="checkbox"> Attending </label>
          </div>
          <button className="remove" onClick={removeGuest}>
            Remove
          </button>
        </div>
      </form>
      <h3>
        Invited Guests: {updatedGuestsList} <br />
      </h3>
    </div>
  );
}

export default App;
