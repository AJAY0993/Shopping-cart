import { useState } from 'react';
import logo from './logo.svg';

const initialItems = [
  {
    "name": "Pizza",
    "image": "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=740&t=st=1700603508~exp=1700604108~hmac=2bad07f847bde806a94a063b79048c9e0af24809e44196af23235a65fbfbce95",
    "id": 1,
    "cost": 8,
    "quantity": 1
  },
  {
    "name": "Coke",
    "image": "https://www.bigbasket.com/media/uploads/p/l/40018072_26-coca-cola-coke-zero-soft-drink-no-sugar.jpg?tr=w-640,q=80",
    "id": 2,
    "cost": 1,
    "quantity": 1
  },
  {
    "name": "Pasta",
    "image": "https://img.freepik.com/free-photo/side-view-penne-pasta-with-tomato-sauce-greens-plate_141793-5043.jpg?w=996&t=st=1700603707~exp=1700604307~hmac=4f91546fb3bbedf5c2aa0c5601347a266ff5cee76dc40390ba0810c636508312",
    "id": 3,
    "cost": 10,
    "quantity": 1
  },
  {
    "name": "Sushi",
    "image": "https://img.freepik.com/premium-photo/japanese-sushi_854558-1677.jpg?w=740",
    "id": 4,
    "cost": 5,
    "quantity": 1
  },
  {
    "name": "Salad",
    "image": "https://img.freepik.com/free-photo/salad-with-fresh-vegetables-plate-top-view_169016-29107.jpg?w=1060&t=st=1700603734~exp=1700604334~hmac=911e5ecaedaae2ff451f087beccf84e77d4661eb91b235b4ee438a7af854b6e9",
    "id": 5,
    "cost": 12,
    "quantity": 1
  }
]
function App() {
  const [list, setList] = useState([...initialItems]);
  function onIncrement(id) {
    setList(list => list.map(x => x.id === id ? { ...x, quantity: x.quantity + 1 } : x))
  }

  function onDecrement(id) {
    setList(list => list.map(x => x.id === id ? { ...x, quantity: x.quantity - 1 } : x));
    setList(list => list.filter(item => item.quantity > 0))
  }

  const Subtotal = list.reduce((acc, item) => acc + item.cost * item.quantity, 0)
  return (
    <div className="App">
      <div className='shopping-cart'>
        <h1>Shopping Cart</h1>
        <ItemList onIncrement={onIncrement} onDecrement={onDecrement} list={list} setList={setList} />
        <h2 className='subTotal'><span>Subtotal:</span> $ {Subtotal}</h2>
      </div>
      <FormAddItem setList={setList} list={list} />
    </div>
  );
}

function ItemList({ list, setList, onIncrement, onDecrement }) {
  return (
    <ul>
      {list.map(item => <Item name={item.name} image={item.image} quantity={item.quantity} cost={item.cost} id={item.id} onIncrement={onIncrement} onDecrement={onDecrement} setList={setList} />)}
    </ul>
  )
}


function Item({ image, name, quantity, cost, id, onIncrement, onDecrement, setList }) {
  function onDelete(id) {
    setList(list => list.filter(item => item.id !== id))
  }
  return (
    <li className='item'>
      <img src={image} alt="" className='item-image' />
      <div>
        <h2 className='item-name'>{name}</h2>
        <span className='item-id'>#{id}</span>
      </div>

      <span className='item-quantity'>
        <button className='setQuantityButton' onClick={() => onDecrement(id)}>-</button>{quantity}
        <button className='setQuantityButton' onClick={() => onIncrement(id)}>+</button>
      </span>

      <span className='item-price'>$ {cost * quantity}</span>

      <button className='remove-item' onClick={() => onDelete(id)}><i class="fa-solid fa-x"></i></button>
    </li>
  )
}

function FormAddItem({ setList, list }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("")
  const [image, setImage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      name,
      quantity, cost, image,
      id: Math.max(...list.map(x => x.id)) + 1
    }
    setList(list => [...list, newItem]);
    setName("");
    setQuantity("");
    setCost("");
    setImage("");
  }
  return (
    <div className='add-items-form'>
      <h2>Add Items</h2>
      <form>
        <input className='add-item-name' type='text' value={name} onChange={(e) => setName(name => e.target.value)} placeholder='Name' />
        <input className='add-item-quantity' type='number' value={quantity} onChange={(e) => setQuantity(quantity => +e.target.value)} placeholder='Quantity' />
        <input className='add-item-price' type='number' value={cost} onChange={(e) => setCost(price => +e.target.value)} placeholder='Price' />
        <input className='add-item-image' type='text' value={image} onChange={(e) => setImage(image => e.target.value)} placeholder='Image' />
        <button onClick={handleSubmit} className='add-item-button'>Add Item</button>
      </form>
    </div>
  )
}
export default App;
