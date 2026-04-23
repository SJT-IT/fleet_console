import { useEffect, useState } from "react";
import { getDealers, deleteDealer } from "../../../services/firestore/dealerService";
import DealerForm from "./DealerForm";
import DealerList from "./DealerList";

export default function DealerPage() {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);

  const fetchDealers = async () => {
    const data = await getDealers();
    setDealers(data);
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDealer(id);
    fetchDealers();
  };

  return (
    <div>
      <h2>Dealer Management</h2>

      <DealerForm
        selectedDealer={selectedDealer}
        refresh={fetchDealers}
        clearSelection={() => setSelectedDealer(null)}
      />

      <DealerList
        dealers={dealers}
        onEdit={setSelectedDealer}
        onDelete={handleDelete}
      />
    </div>
  );
}