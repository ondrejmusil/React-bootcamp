import {useState} from "react";

const {initialFriends} = require('./data/friends');
export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [displayAddFriend, setDisplayAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleAddFriend(friend) {
        setFriends([...friends, friend]);
        setDisplayAddFriend(false);
    }

    function handleSelection(friend) {
        setSelectedFriend((current) => current?.id === friend.id ? null : friend);
        setDisplayAddFriend(false);
    }

    function handleSplitBill(value) {
        console.log(value);

        setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));
    }

    return (
        <div className="app">
            <div className='sidebar'>
                <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>
                {displayAddFriend ? <FormAddFriend onAddFriend={handleAddFriend} /> : null}
                <Button
                    onClick={() => setDisplayAddFriend(!displayAddFriend)}>{displayAddFriend ? 'Cancel' : 'Add Friend'}</Button>
            </div>
            {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
        </div>
    );
}

function FriendsList({friends, onSelection, selectedFriend}) {
    return (
        <div>
            <ul>{friends.map(friend => {
                return <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
            })}</ul>
        </div>
    )
}

function Friend({friend, onSelection, selectedFriend}) {
    const isSelected = selectedFriend?.id === friend.id;
    let phrase;

    if (friend.balance > 0) {
        phrase = `${friend.name} owes you ${friend.balance}`;
    } else if (friend.balance < 0) {
        phrase = `You owe ${friend.name} ${Math.abs(friend.balance)}`;
    } else {
        phrase = `You and ${friend.name} are even`;
    }

    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>
            <p className={friend.balance > 0 ? 'green' : friend.balance < 0 ? 'red' : null}>{phrase}</p>
            <Button onClick={() => {onSelection(friend)}}>{isSelected ? 'Close' : 'Select'}</Button>
        </li>
    )
}

function Button({children, onClick}) {
    return <button className='button' onClick={onClick}>{children}</button>
}

function FormAddFriend({onAddFriend}) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48');

    function handleSubmit(e) {
        // to prevent whole page reload
        e.preventDefault();

        if (!name || !image) return;

        const id = crypto.randomUUID()

        const newFriend = {
            id,
            name,
            image: `${image}?u=${id}`,
            balance: 0
        }

        onAddFriend(newFriend);

        setName('');
        setImage('https://i.pravatar.cc/48');
    }

    return (
        <form className='form-add-friend' onSubmit={handleSubmit}>
            <label>👫 Friend name</label>
            <input type='text' value={name} onChange={event => setName(event.target.value)}></input>

            <label>📸 Image URL</label>
            <input type='text' value={image} onChange={event => setImage(event.target.value)}></input>

            <button className='button'>Add</button>
        </form>
    )
}

function FormSplitBill({selectedFriend, onSplitBill}) {
    const [bill, setBill] = useState('');
    const [paidByUser, setPaidByUser] = useState('');
    const [whoIsPaying, setWhoIsPaying] = useState('user');
    const paidByFriend = bill ? bill - paidByUser : '';

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) return;
        onSplitBill(whoIsPaying === 'user' ? paidByFriend : - paidByUser);
    }

    return (
        <form className='form-split-bill' onSubmit={handleSubmit}>
            <h2>Split bill with {selectedFriend.name}</h2>

            <label>💰 Bill value:</label>
            <input type='number' min={1} value={bill} onChange={e => setBill(Number(e.target.value))}></input>

            <label>💸 Your expense:</label>
            <input type='number' min={0} value={paidByUser} onChange={e => {setPaidByUser(Number(e.target.value)  > bill ? paidByUser : Number(e.target.value))}}></input>

            <label>👫 {selectedFriend.name}'s expense:</label>
            <input type='number' disabled value={paidByFriend}></input>

            <label>🤑 Who paid the bill</label>
            <select value={whoIsPaying} onChange={e => {setWhoIsPaying(e.target.value)}}>
                <option value='you'>You</option>
                <option value='friend'>{selectedFriend.name}</option>
            </select>

            <Button>Split bill</Button>
        </form>
    )
}
