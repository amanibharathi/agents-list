import AgentsList from "./AgentsList";
import { AdminListFilterProvider } from "../Auth/AgentComponents/admincompenets/AdminListFilterProvider";

const Agent = () => {
  return (
    <AdminListFilterProvider>
      <AgentsList />
    </AdminListFilterProvider>
  );
};

export default Agent;
