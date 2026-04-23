export default function DriverList({ drivers, onEdit, onDelete }) {
  return (
    <div>
      <h3>Drivers</h3>

      {drivers.map((d) => (
        <div key={d.id} style={{ border: "1px solid gray", margin: 10 }}>
          <p><b>{d.fullName}</b></p>
          <p>Vehicle: {d.assignedVehicleId || "None"}</p>

          <button onClick={() => onEdit(d)}>Edit</button>
          <button onClick={() => onDelete(d.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}