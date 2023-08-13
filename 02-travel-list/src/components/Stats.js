export default function Stats({ items }) {
  if (items.length === 0) {
    return (
      <p className="stats">
        <em>Start adding some items to your list 🚀</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPackedItems = items.filter((el) => el.packed).length;
  const percentage = Math.floor((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `🧳 You have ${numItems} items on your list and you already packed ${numPackedItems} (${percentage} %).`}
      </em>
    </footer>
  );
}
