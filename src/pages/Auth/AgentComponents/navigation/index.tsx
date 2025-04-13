export const ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE = (id: string) =>
  `/admin/agents/onboarding-agents/${id}/on-oboarding-application`;
export const MAKE_ACTIVE_AGENTS_LIST_PAGE = (
  agent_status: string | undefined,
  onboard_type: string | undefined,
  primary_state: string | undefined,
  sort_by: string | undefined,
  brokerage: string | undefined,
  joining_date_after: string | undefined,
  joining_date_before: string | undefined
) =>
  `/admin/agents/agents-list/?${
    agent_status ? "&agent_status=" + agent_status : ""
  }${onboard_type ? "&onboard_type=" + onboard_type : ""}${
    primary_state ? "&primary_state=" + primary_state : ""
  }${sort_by ? "&sort_by=" + sort_by : ""}${
    brokerage ? "&brokerage=" + brokerage : ""
  }${joining_date_after ? "&joining_date_after=" + joining_date_after : ""}${
    joining_date_before ? "&joining_date_before=" + joining_date_before : ""
  }`;
