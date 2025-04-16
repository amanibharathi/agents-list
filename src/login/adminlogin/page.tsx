import { useState } from "react";
import LoginWrapper from "../LoginWrapper";
import AdminLoginForm from "./AdminLoginFormContainer";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { REFRESH_API } from "../../api-utils";
import { ADMIN_DASHBOARD } from "../../pages/Auth/AgentComponents/navigation/urls";
import useManageCookies from "../../utils/hooks/useSetCookiesOnSuccess";
import makeGetRequest from "../../api/makeGetRequest";

const AdminLoginPage = () => {
  const [comp, setComp] = useState("login");
  const navigate = useNavigate();
  const { handleSetCookiesOnSuccess } = useManageCookies();

  // Convert to the object syntax for useMutation
  useQuery([], () => makeGetRequest(REFRESH_API), {
    onSuccess: (res) => {
      handleSetCookiesOnSuccess(res);
      navigate(ADMIN_DASHBOARD);
    },
    retry: 1,
  });

  return (
    <LoginWrapper>
      <AdminLoginForm comp={comp} setComp={setComp} />
    </LoginWrapper>
  );
};

export default AdminLoginPage;
