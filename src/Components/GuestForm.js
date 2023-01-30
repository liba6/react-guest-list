import { useState } from 'react';

export default function GuestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendingStatus, setAttendingStatus] = useState(false);
  const [allGuests, setAllGuests] = useState([]);
  const baseUrl = 'http://localhost:4000';

  // send data to api
  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        attendingStatus: attendingStatus,
      }),
    });
    const createdGuest = await response.json();
    console.log('post and get', createdGuest, allGuests);
  }

  // to get names of all guests
  async function getGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuestResponse = await response.json();
    setAllGuests(allGuestResponse);
  }
  // function when pressing Enter
  async function onEnterChange(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      await addGuest();
      await getGuests();
      setFirstName('');
      setLastName('');
    }
  }
  // function to remove Guests
  async function Remove() {
    const response = await fetch(`${baseUrl}/guests/${allGuests.length - 1}`, {
      method: 'DELETE',
    });
    await response.json();
  }

  console.log('attendingStatus', attendingStatus);
  return (
    <div data-test-id="guest" className="pic">
      <h1>React Guest List</h1>
      <form className="form" onSubmit={(event) => event.preventDefault()}>
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
              onClick={() => setAttendingStatus(true)}
            />
            <label htmlFor="checkbox"> Attending </label>
          </div>
          <button className="remove" onClick={Remove}>
            Remove
          </button>
        </div>
      </form>
      <h3>Invited Guests: {JSON.stringify(allGuests)}</h3>
    </div>
  );
}
