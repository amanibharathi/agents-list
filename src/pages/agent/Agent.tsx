// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
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
