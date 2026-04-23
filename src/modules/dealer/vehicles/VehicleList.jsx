export default function VehicleList({ vehicles, onEdit, onDelete }) {
  return (
    <div>
      <h3>Vehicles</h3>

      {vehicles.map((v) => (
        <div key={v.id} style={{ border: "1px solid gray", margin: 10 }}>
          <p><b>{v.licensePlate}</b></p>
          <p>{v.make} {v.model}</p>
          <p>Status: {v.status}</p>

          <button onClick={() => onEdit(v)}>Edit</button>
          <button onClick={() => onDelete(v.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}