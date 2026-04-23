export default function DealerList({ dealers, onEdit, onDelete }) {
  return (
    <div>
      <h3>All Dealers</h3>

      {dealers.map((d) => (
        <div key={d.id} style={{ border: "1px solid gray", margin: 10 }}>
          <p><b>{d.name}</b></p>
          <p>{d.email}</p>
          <p>Status: {d.status}</p>

          <button onClick={() => onEdit(d)}>Edit</button>
          <button onClick={() => onDelete(d.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}