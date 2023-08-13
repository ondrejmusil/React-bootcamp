import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  }

  function handleClearList() {
    const confirmation = window.confirm(
      `Are you sure you want to delete all items?`,
    );
    if (confirmation) setItems([]);
  }

  function handleToggleItem(id) {
    setItems((items) => {
      return items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      );
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
