import VehiclePage from "../modules/dealer/vehicles/VehiclePage";
import DriverPage from "../modules/dealer/drivers/DriverPage";

export default function DealerDashboard() {
  return (
    <div>
      <h1>Dealer Dashboard</h1>
      <VehiclePage />
      <DriverPage />
    </div>
  );
}