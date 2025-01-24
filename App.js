import React, { useState } from 'react';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Groceries'];

  const addItem = () => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    setNewItem({ name: '', category: '', quantity: 0 });
  };

  const editItem = (id) => {
    const itemToEdit = inventory.find(item => item.id === id);
    setNewItem({ name: itemToEdit.name, category: itemToEdit.category, quantity: itemToEdit.quantity });
    setInventory(inventory.filter(item => item.id !== id));
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const filteredInventory = filterCategory
    ? inventory.filter(item => item.category === filterCategory)
    : inventory;

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    return sortOrder === 'ascending' ? a.quantity - b.quantity : b.quantity - a.quantity;
  });

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>INVENTORY MANAGEMENT</h1>

      <div>
        <h3>Add Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <div>
        <h3>Filter by Category</h3>
        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Sort by Quantity</h3>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedInventory.map((item) => (
            <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? 'orange' : 'transparent' }}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editItem(item.id)} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
