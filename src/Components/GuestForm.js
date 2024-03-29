import { useEffect, useState } from 'react';

export default function GuestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allGuests, setAllGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('');

  const baseUrl =
    'https://express-guest-list-api-memory-data-store.liba6.repl.co';

  // add Guest with fetching api
  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    setAllGuests([...allGuests], createdGuest);
    setFirstName('');
    setLastName('');
  }

  // to update data in api
  async function updateGuests(id, attending) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !attending }),
    });

    const updatedGuest = await response.json();
    const allGuestsWhoChanged = [...allGuests].map((guest) => {
      if (updatedGuest.id !== guest.id) {
        return guest;
      } else {
        return updatedGuest;
      }
    });
    setAllGuests(allGuestsWhoChanged);
  }

  // to get names of all guests
  const getGuests = async () => {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuestResponse = await response.json();
    setAllGuests(allGuestResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    getGuests().catch((error) => {
      setHasError(error);
      return hasError;
    });
  }, [hasError]);

  // function when pressing Enter
  async function onEnterChange(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      await addGuest();
    }
  }
  // function to remove Guests
  async function remove(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestsArray = allGuests.filter((guest) => {
      return guest.id !== deletedGuest.id;
    });
    setAllGuests(newGuestsArray);
  }
  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className="pic">
      <h1>React Guest List</h1>
      <h2> Please enter your name </h2>
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <div className="name">
          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            className="input"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            disabled={isLoading}
          />
          <label htmlFor="lastname">Last name</label>
          <input
            id="lastname"
            className="input"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            onKeyDown={onEnterChange}
            disabled={isLoading}
          />
        </div>
      </form>
      {allGuests.map((guest) => (
        <div data-test-id="guest" key={`guest -${guest.id}`} className="check">
          {guest.firstName} {guest.lastName}
          <label htmlFor="checkbox"> Attending </label>
          <input
            className="input"
            type="checkbox"
            id={`checkbox-${guest.id}`}
            checked={guest.attending}
            aria-label={`attending ${guest.firstName} ${guest.lastName}`}
            onChange={() => updateGuests(guest.id, guest.attending)}
          />
          <button
            aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
            className="remove"
            onClick={() => remove(guest.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
