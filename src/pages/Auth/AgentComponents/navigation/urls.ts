// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
//import { DEFAULT_LOCATION_META } from '@/app/appConfig'
//import { user_dashboard_paths } from '../paths'

import { user_dashboard_paths } from "../admincompenets/paths";

// -----------------------------------------------------
// --------------------- ROUTES ------------------------
// -----------------------------------------------------
export const MAKE_DETAIL_PAGE = (id, suffix = "") =>
  `/detail/${id}/${suffix ? suffix : ""}`;
export const MAKE_SCHEDULE_TOUR_PAGE = (
  id,
  type = "in_person",
  date,
  time,
  leadType
) =>
  `/detail/${id}/schedule-tour/?${"type=" + type}${
    date ? "&date=" + date : ""
  }${time ? "&time=" + time : ""}${leadType ? "&lead_type=" + leadType : ""}`;
export const BUY_LIST_PAGE = (search) => "/city/" + search;
// export const PROPERTY_LIST_ROUTE = (polygon, params, type, filter) => {
//   const polygonId = polygon
//     ? is_uri_encoded(polygon)
//       ? polygon
//       : encodeURIComponent(polygon)
//     : ''

//   let encodedCity
//   let encodedState
//   if (params?.city && params?.state) {
//     encodedCity = is_uri_encoded(params.city)
//       ? params.city
//       : encodeURIComponent(params.city)
//     encodedState = is_uri_encoded(params.state)
//       ? params.state
//       : encodeURIComponent(params.state)
//   }
//   let encodedNeighbourhood
//   if (params?.neighbourhood) {
//     encodedNeighbourhood = is_uri_encoded(params.neighbourhood)
//       ? params.neighbourhood
//       : encodeURIComponent(params.neighbourhood)
//   }
//   let path = '#'
//   if (params?.zip) {
//     path = `/zipcode/${params?.zip}/${polygonId}`
//   } else if (params?.neighbourhood && params?.state && params?.city) {
//     path = `/neighbourhood/${encodedState}/${encodedCity}/${encodedNeighbourhood}/${polygonId}`
//   } else if (!params?.neighbourhood && params?.state && params?.city) {
//     path = `/city/${encodedState}/${encodedCity}/${polygonId}`
//   } else if (params?.googleSearch) {
//     path = `/google-search/${params?.geoName}${params?.flowType ? `/${params?.flowType}` : ''}`
//   } else {
//     path = `/city/${DEFAULT_LOCATION_META.state}/${DEFAULT_LOCATION_META.city}/${DEFAULT_LOCATION_META.polygonId}`
//   }

//   return path + (type ? '/' + type : '') + (filter ?? '')
// }

export const MAKE_ESTIMATE_HOME_BY_ID = (id) => `/estimate-home-value/${id}`;
export const AGENT_ONBOARD_STEP_PATH = (step) =>
  `/real-estate-agents/join/onboard/${step}`;
export const AGENT_TEAM_ONBOARDING_PAGE =
  "/real-estate-agents/join/onboard/team-onboarding";
export const AGENT_SUCCESS_PAGE =
  "/real-estate-agents/join/onboard/stage/successfullyCreated";
export const AGENT_ONBOARDING_STAGE_PAGE =
  "/real-estate-agents/join/onboard/stage";
export const AGENT_FORM_STEP_PATH = (id, step) =>
  `/real-estate-agents/join/onboard/stage/${id}/${step}`;
export const AGENT_ONBOARD_FORMS = `/real-estate-agents/join/onboard/forms`;
export const AGENT_ADMIN_SIGN_UP_PAGE = (id) =>
  `/real-estate-agents/join/onboard/signup/${id}`;
export const AGENT_ADMIN_SIGN_UP_STATE_ERROR = `/real-estate-agents/join/onboard/state-lock-error`;
export const JOIN_AS_A_AGENT_PATH = `/real-estate-agents/join/`;
export const AGENT_ONBOARD_FORMS_COMPLETED = `/real-estate-agents/join/onboard/stage/completed`;
export const AGENT_ONBOARD_LOGIN = (protocol, environ, baseHost) => {
  return (
    makeWebsiteOrigin(protocol, environ, "join", baseHost) +
    "/real-estate-agents/join/onboard/login"
  );
};
export const AGENT_DOMAIN_ONBOARD_LOGIN = (protocol, environ, baseHost) => {
  return (
    makeWebsiteOrigin(protocol, environ, "agent", baseHost) + "/agent/login"
  );
};
export const AGENT_ONBOARD_SIGNUP = (protocol, environ, baseHost) =>
  makeWebsiteOrigin(protocol, environ, "join", baseHost) +
  `/real-estate-agents/join/onboard/signup`;
export const AGENT_SIGN_UP_PAGE = (protocol, environ, baseHost) =>
  makeWebsiteOrigin(protocol, environ, "join", baseHost) +
  `/real-estate-agents/join/onboard/signup`;
export const AGENT_FORGOT_PASSWORD_PAGE = `/real-estate-agents/join/onboard/forgot-password`;
export const AGENT_DASHBOARD_FORGOT_PASSWORD_PAGE = `/agent/forgot-password`;
export const AGENT_RECRUITING_PAGE = (protocol, environ, baseHost) =>
  makeWebsiteOrigin(protocol, environ, "join", baseHost) + `/`;
export const AGENT_ONBOARD_SIGNUP_SPONSOR = (protocol, environ, baseHost, id) =>
  makeWebsiteOrigin(protocol, environ, "join", baseHost) +
  `/real-estate-agents/join/onboard/signup?sponsor=${id}`;
export const AGENT_ONBOARD_STAGE_PAGE = (protocol, environ, baseHost) =>
  makeWebsiteOrigin(protocol, environ, "join", baseHost) +
  "/real-estate-agents/join/onboard/stage";
// -----------------------------------------------------
// --------------- Agent Dashboard routes ---------------
// -----------------------------------------------------

export const AGENT_HOME_PAGE = "/our-agents";
export const AGENT_LIST_PAGE = "/agent-list";
export const WHY_ROC_PAGE = "/why-roc";
export const BUY_WITH_ROC_HOME_PAGE = "/buy-with-roc";
export const SELL_WITH_ROC_HOME_PAGE = "/sell-with-roc";
export const MORTGAGE_GET_PRE_APPROVED_PAGE = "/mortgage-get-preapproved";
export const RENT_HOME_PAGE = "/rent";
export const FIND_MY_HOME_WORTH_PAGE = "/estimate-home-value";
export const ROC_ESTIMATED_HOME_WORTH = "/roc-home-estimate";
export const FIND_REAL_ESTATE_AGENTS_PAGE = "/real-estate-agents";
export const MAKE_AGENT_DETAIL_PAGE = (id) => `/real-estate-agents/${id}`;
export const JOIN_REAL_ESTATE_AGENTS_PAGE = "/real-estate-agents/join";
export const FEED_PAGE = "/feed";
export const SCHEDULE_CONSULTATION_FORMS_PAGE = (id) =>
  `/get-seller-info?property_id=${id}`;
export const AVAILABLE_CITIES_LIST_PAGE = (type) =>
  "/cities" + (type ? "/" + type : "");
// calculator pages
export const HOME_SALE_CALCULATOR = "/home-sale-calculator";
export const HOME_AFFORDABLE_CALCULATOR = "/home-affordability-calculator";
export const RENT_CALCULATOR_PAGE = "/rent/calculator";
export const MORTGAGE_CALCULATOR_PAGE = "/mortgage/calculator";
export const MORTGAGE_PAGE = "/mortgage";

// -----------------------------------------------------
// --------------- Agent Dashboard routes ---------------
// -----------------------------------------------------
export const LEADS_LIST_AGENT_PAGE = `/agent/leads/`;
export const MAKE_CREATE_LEAD_AGENT_PAGE = `/agent/leads/create`;
export const MAKE_VIEW_LEAD_AGENT_PAGE = (id) =>
  `/agent/leads/view/${id}/activities`;
export const MAKE_VIEW_AGENT_LEAD_TAB = (id, tab) =>
  `/agent/leads/view/${id}/${tab}`;

export const AGENT_DASHBOARD_PAGE = (protocol, environ, baseHost) =>
  makeWebsiteOrigin(protocol, environ, "agent", baseHost) + "/agent/dashboard";
export const MAKE_VIEW_AGENT_DASHBOARD_TAB = (tab) => `/agent/dashboard/${tab}`;
export const MAKE_VIEW_AGENT_MY_OFFICE_TAB = (tab) => `/agent/my-office/${tab}`;
export const AGENT_DASHBOARD_OFFICE_DETAILS_PAGE = (id) =>
  `/agent/my-office/office-details/${id}`;
export const MAKE_VIEW_AGENT_WEBSITE_TAB = (tab) =>
  `/agent/agent-website/${tab}`;
export const MAKE_AGENT_DASHBOARD_PAGE = (
  protocol,
  environ,
  baseHost,
  token,
  type
) =>
  makeWebsiteOrigin(protocol, environ, "agent", baseHost) +
  `/agent/dashboard?switch-id=${token}&switch-type=${type}`;
// -----------------------------------------------------
// --------------- User Dashboard routes ---------------
// -----------------------------------------------------
export const USER_DASHBOARD_ROUTE = (path = 0) =>
  `/user/${user_dashboard_paths[path]}`;
export const MAKE_START_AN_OFFER_PAGE = (id) => `/detail/${id}/start-an-offer/`;
export const USER_DASH_OFFERS_PAGE = `/user/offers/`;
export const CHANGE_USER_PASSWORD_PAGE = "/change-password";
export const USER_DASH_OWNER_DASH = "/user/owner-dashboard/";
// -----------------------------------------------------
// --------------- Admin Dashboard routes ---------------
// -----------------------------------------------------
export const ADMIN_LOGIN ="/admin/login";
export const ADMIN_DASHBOARD = "/admin/agents/agents-list";
export const MAKE_ADMIN_DASHBOARD = (
  protocol,
  environ,
  baseHost,
  token,
  type
) =>
  makeWebsiteOrigin(protocol, environ, "admin", baseHost) +
  `/admin/dashboard?token=${token}&type=${type}`;
export const ADMIN_LEADS = "/admin/leads";
export const ADMIN_AGENTS_LISTING = "/admin/agents/agents-list";
export const MAKE_AGENT_INDIVIDUAL_PAGE = (uuid, id) =>
  `/admin/agents/${uuid}/${id}/`;
export const MAKE_ADMIN_AGENT_ONBOARD_STEPS = `/admin/agents/onboard/steps/`;
export const ADMIN_BLOGS_LISTING = "/admin/resources";
export const MAKE_RESOUCES_PAGES = (subMenu, id = null, crud = "") =>
  `/admin/resources/${subMenu}/${id ? id + "/" : ""}${crud}`;
export const ADMIN_BLOGS_CREATION = "/admin/resources/blog/create";
export const MAKE_ADMIN_LEAD_VIEW = (uuid, id, tab = "profile") =>
  `/admin/leads/${uuid}/${id}/view/${tab}/`;
export const MAKE_AGENT_LEAD_EDIT = (uuid) => `/agent/leads/edit/${uuid}`;
export const MAKE_ADMIN_SETTINGS_PAGE = (tab = "user-profile", subtab) =>
  `/admin/settings/${tab}${subtab ? `/${subtab}` : ""}`;
export const ADMIN_ROLES_LISTING = `/admin/settings/roles-and-permissions/`;
export const ADMIN_CREATE_ROLE = `/admin/settings/roles-and-permissions/create`;
export const ADMIN_AGENT_APPLICANTS = `/admin/agents/become-an-agent/`;
export const ADMIN_FORM_SUB_GROUP = (id) => `/admin/form-builder/${id}`;
export const ADMIN_MAKE_AGENT_INDIVIDUAL_PAGE = (id) =>
  `/admin/agents/onboarding-agents/${id}/on-oboarding-application`;
export const MAKE_APPLIED_AGENTS_LIST_PAGE = (
  stage_status,
  agent_status,
  stage,
  onboard_type,
  primary_state,
  sort_by,
  brokerage,
  modified_after,
  modified_before,
  last_active
) =>
  `/admin/agents/applied-agents-list?${
    stage_status ? "&stage_status=" + stage_status : ""
  }${agent_status ? "&agent_status=" + agent_status : ""}${
    stage ? "&stage=" + stage : ""
  }${onboard_type ? "&onboard_type=" + onboard_type : ""}${
    primary_state ? "&primary_state=" + primary_state : ""
  }${sort_by ? "&sort_by=" + sort_by : ""}${
    brokerage ? "&brokerage=" + brokerage : ""
  }${modified_after ? "&modified_after=" + modified_after : ""}${
    modified_before ? "&modified_before=" + modified_before : ""
  }${last_active ? "&last_active=" + last_active : ""}`;
export const MAKE_ACTIVE_AGENTS_LIST_PAGE = (
  agent_status,
  onboard_type,
  primary_state,
  sort_by,
  brokerage,
  joining_date_after,
  joining_date_before
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
export const MAKE_ACTIVE_TEAMS_LIST_PAGE = (
  agent_type,
  state,
  mls,
  status,
  sort_by
) =>
  `/admin/teams/teams-list/?${agent_type ? "&agent_type=" + agent_type : ""}${
    state ? "&state=" + state : ""
  }${mls ? "&mls=" + mls : ""}${status ? "&status=" + status : ""}${
    sort_by ? "&sort_by=" + sort_by : ""
  }`;
export const MAKE_APPLIED_TEAMS_LIST_PAGE = (
  agent_type,
  state,
  mls,
  status,
  sort_by
) =>
  `/admin/teams/applied-teams-list/?${
    agent_type ? "&agent_type=" + agent_type : ""
  }${state ? "&state=" + state : ""}${mls ? "&mls=" + mls : ""}${
    status ? "&status=" + status : ""
  }${sort_by ? "&sort_by=" + sort_by : ""}`;

export const MAKE_TEAM_ROSTER_LIST_PAGE = (
  id,
  role,
  agent_status,
  cap,
  split
) =>
  `/admin/teams/${id}/team-members?${
    role ? "&role=" + role : ""
  }${agent_status ? "&agent_status=" + agent_status : ""}${
    cap ? "&cap=" + cap : ""
  }${split ? "&split=" + split : ""}`;

export const MAKE_BROKERAGE_DETAIL_PAGE = (id) =>
  `/admin/states-and-offices/offices/${id}/office-information`;
//new admin routes
export const MAKE_AGENT_RELATED_LIST_PAGE = (path) => `/admin/agents/${path}`;
export const MAKE_AGENT_RELATED_LIST_PAGE1 = (path) => `/admin/teams/${path}`;
export const MAKE_DASHBOARD_LIST_PAGE = (path, tabPath) =>
  `/admin/dashboard${path ? `/${path}` : ""}${tabPath ? `/${tabPath}` : ""}`;
export const ADMIN_TEAM_CREATION_PAGE = `/admin/agents/onboarding-teams/create`;
export const MAKE_ADMIN_TEAM_DETAIL_PAGE = (id) =>
  `/admin/agents/applied-teams/${id}`;
export const MAKE_AGENT_DETAIL_TAB_PAGE = (id, path) =>
  `/admin/agents/${id}/${path}`;
export const MAKE_ADMIN_TEAM_DETAIL_TAB = (id, path) =>
  `/admin/teams/${id}/${path ? path : ""}`;
export const MAKE_ADMIN_TEAM_DETAIL_TAB1 = (id, path) =>
  `/admin/teams/${id}/${path ? path : "team-members"}`;
export const MAKE_ADMIN_BROKERAGE_DETAILS_TAB = (id, path) =>
  `/admin/states-and-offices/offices/${id}/${path ? path : ""}`;
export const ADMIN_STATES_AND_BROKERAGES_LISTING = `/admin/states-and-offices/offices`;
export const ADMIN_CREATE_STATES_AND_BROKERAGES = `/admin/states-and-offices/offices/create`;
export const ADMIN_FORM_BULIDER_PAGE = `/admin/form-builder`;
export const ADMIN_OKTA_SYNC_PAGE = `/admin/okta-sync`;
export const ADMIN_TOOLS = "/admin/tools";
export const ADMIN_REVSHARE_NETWORK = "/admin/revshare/network";
export const ADMIN_TOOLS_LISTING_PAGE = (
  sort_by,
  modified_after,
  modified_before,
  tool_type
) =>
  `/admin/meta/tools/?${tool_type ? "&tool_type=" + tool_type : ""}${
    sort_by ? "&sort_by=" + sort_by : ""
  }${modified_after ? "&modified_after=" + modified_after : ""}${
    modified_before ? "&modified_before=" + modified_before : ""
  }`;
export const ADMIN_MANAGING_BROKER_LICENSE_TRANSFER_PAGE = (
  tab,
  subtab,
  sort_by,
  status,
  state,
  modified_after,
  modified_before
) =>
  `/admin/dashboard/${tab}/${subtab}/?${status ? "&status=" + status : ""}${
    state ? "&state=" + state : ""
  }${sort_by ? "&sort_by=" + sort_by : ""}${
    modified_after ? "&modified_after=" + modified_after : ""
  }${modified_before ? "&modified_before=" + modified_before : ""}`;
export const MAKE_ADMIN_META_PAGE = (tab = "tools") => `/admin/meta/${tab}`;
export const ADMIN_FAQ_TOPIC_LISTING_PAGE = (
  sort_by,
  modified_after,
  modified_before
) =>
  `/admin/meta/faq-topic/?${sort_by ? "&sort_by=" + sort_by : ""}${
    modified_after ? "&modified_after=" + modified_after : ""
  }${modified_before ? "&modified_before=" + modified_before : ""}`;
export const ADMIN_FAQ_LISTING_PAGE = (topic) =>
  `/admin/meta/faq/?${topic ? "&topic=" + topic : ""}`;
export const ADMIN_SMS_CAMPAIGN_UPDATE_PAGE = (id) =>
  `/admin/settings/campaign/${id}`;
export const MAKE_STATES_AND_OFFICES_LIST_PAGE = (path) =>
  `/admin/states-and-offices/${path}`;
export const MAKE_MARKETING_GROUPS_LIST_PAGE = (
  type,
  mls,
  primary_state,
  joining_date_after,
  joining_date_before
) =>
  `/admin/states-and-offices/marketing-groups/?${type ? "type=" + type : ""}${
    mls ? "&mls=" + mls : ""
  }${primary_state ? "&primary_state=" + primary_state : ""}${
    joining_date_after ? "&joining_date_after=" + joining_date_after : ""
  }${joining_date_before ? "&joining_date_before=" + joining_date_before : ""}`;

export const ADMIN_MG_CREATE_PAGE = `/admin/states-and-offices/marketing-groups/create`;
export const MAKE_ADMIN_MG_DETAIL_PAGE = (id, tab = "group-information") =>
  `/admin/states-and-offices/marketing-groups/${id}/${tab}/`;
export const ADMIN_SMS_CAMPAIGN_CREATE_PAGE = `/admin/settings/campaign/create`;
export const ADMIN_TEAM_EDIT_PAGE = (id) =>
  `/admin/teams/edit/${id}`;
export const ADMIN_TEAM_MEMBERS_INDIVIDUAL_PAGE = (teamId, memberId) =>
  `/admin/teams/onboarding-teams/${teamId}/team-members/${memberId}`;
export const MAKE_ADMIN_APPLIED_TEAM_DETAIL_TAB = (id, path) =>
  `/admin/teams/${id}/${path ? path : ""}`;
export const MAKE_ADMIN_JOIN_REQUEST_PAGE = (path = "agent-list") =>
  `/admin/join-request/${path}`;
export const ADMIN_JOIN_REQUEST_INDIVIDUAL_LIST_META = (type) =>
  `/agent/join/request/list/table-meta/${type ? `?request_type=${type}` : ""}`;
export const ADMIN_JOIN_REQUEST_INDIVIDUAL_LIST = (type) =>
  `/agent/join/request/list/${type ? `?request_type=${type}` : ""}`;
export const ADMIN_DASHBOARD_TEAM_REQUESTS_TABS_LISTING = (
  tab = "join-team",
  sort,
  status,
  modified_after,
  modified_before,
  request_type,
  team
) =>
  `/admin/dashboard/team-requests/${tab}?${sort ? `&sort_by=${sort}` : ""}${
    status ? `&status=${status}` : ""
  }${modified_after ? "&modified_after=" + modified_after : ""}${
    modified_before ? "&modified_before=" + modified_before : ""
  }${request_type ? `&request_type=${request_type}` : ""}${
    team ? `&team=${team}` : ""
  }`;
export const ADMIN_TEAM_REQUEST_INDIVIDUAL_PAGE = (teamId, requestId) =>
  `/admin/agents/onboarding-teams/${teamId}/team-requests/${requestId}`;
export const ADMIN_TEAM_DOCUMENT_LISTING = (
  id,
  document_type,
  uploaded_by,
  modified_after,
  modified_before,
  sort_by
) =>
  `/admin/agents/${id}/documents?${
    document_type ? `&document_type=${document_type}` : ""
  }${uploaded_by ? `&uploaded_by=${uploaded_by}` : ""}${
    modified_after ? "&modified_after=" + modified_after : ""
  }${modified_before ? "&modified_before=" + modified_before : ""}${
    sort_by ? `&sort_by=${sort_by}` : ""
  }`;
  export const ADMIN_TEAM_DOCUMENT_LISTING1 = (
    id,
    document_type,
    uploaded_by,
    modified_after,
    modified_before,
    sort_by
  ) =>
    `/admin/teams/${id}/documents?${
      document_type ? `&document_type=${document_type}` : ""
    }${uploaded_by ? `&uploaded_by=${uploaded_by}` : ""}${
      modified_after ? "&modified_after=" + modified_after : ""
    }${modified_before ? "&modified_before=" + modified_before : ""}${
      sort_by ? `&sort_by=${sort_by}` : ""
    }`;
export const ADMIN_TEAM_REQUEST_LISTING = (
  id,
  request_type,
  status,
  modified_after,
  modified_before,
  sort_by
) =>
  `/admin/teams/${id}/team-requests?${
    request_type ? `&request_type=${request_type}` : ""
  }${status ? `&status=${status}` : ""}${
    modified_after ? "&modified_after=" + modified_after : ""
  }${modified_before ? "&modified_before=" + modified_before : ""}${
    sort_by ? `&sort_by=${sort_by}` : ""
  }`;
export const MAKE_ADMIN_SETTINGS_ROLES_CREATE_PAGE = (
  tab = "roles-and-permissions"
) => `/admin/settings/${tab}/create`;
export const MAKE_ADMIN_SETTINGS_ROLES_DETAIL_PAGE = (id) =>
  `/admin/settings/roles-and-permissions/admin-roles/${id}`;
export const MAKE_ADMIN_SETTINGS_ROLES_AND_RESPONSILIBILTIES_LISTING = (
  tab = "admin-roles",
  role,
  sort,
  modified_after,
  modified_before
) =>
  `/admin/settings/roles-and-permissions/${tab}?${role ? `&role=${role}` : ""}${
    sort ? `&sort=${sort}` : ""
  }${modified_after ? "&modified_after=" + modified_after : ""}${
    modified_before ? "&modified_before=" + modified_before : ""
  }`;
export const MAKE_ADMIN_SETTINGS_USER_AND_ROLES_LISTING = (
  role,
  sort,
  modified_after,
  modified_before
) =>
  `/admin/settings/user-and-roles?${role ? `&role=${role}` : ""}${
    sort ? `&sort=${sort}` : ""
  }${modified_after ? "&modified_after=" + modified_after : ""}${
    modified_before ? "&modified_before=" + modified_before : ""
  }`;
export const MAKE_ADMIN_SETTINGS_USER_AND_ROLES_DETAIL_PAGE = (id) =>
  `/admin/settings/user-and-roles/${id}`;
export const MAKE_USER_ROLES_CREATE_PAGE = `/admin/settings/user-and-roles/create`;
// ------------------------------------------------------
// --------------- Resources routes ---------------
// ------------------------------------------------------
export const ALL_RESOURCES_PAGE = "/resources";
export const BLOG_LISTING_PAGE = "/blogs";
export const MAKE_RESOURCES_INDIVIDUAL_PAGE = (resourceType) =>
  `/resources/${resourceType}`;
export const MAKE_RESOURCES_CATEGORY_PAGE = (resourceType, categoryType) =>
  `/resources/${resourceType}/${categoryType}`;
export const MAKE_BLOG_INDIVIDUAL_PAGE = (id) => `/resources/details/${id}`;

// ------ Privacy pages routes ----
export const PRIVACY_PAGE = "https://www.realtyofamerica.com/privacy";
export const COOKIES_PAGE = "https://www.realtyofamerica.com/cookies";
export const DMCA_PAGE = "https://www.realtyofamerica.com/dmca";
export const SITEMAP_PAGE = "https://www.realtyofamerica.com/sitemap";
export const TERMS_PAGE =
  "https://www.realtyofamerica.com/website-terms-and-conditions-of-use";

// -------- temporary redirection for privacy, terms, etc.. ------- //

export const temporaryRedirect = (name) =>
  `https://www.realtyofamerica.com/${name}/`;

export const HOME_PAGE = "https://realtyofamerica.com";

const makeWebsiteOrigin = (
  protocol,
  environment = "",
  app_subdomain = "",
  baseHost
) =>
  protocol + // http | https
  "//" +
  (environment ? environment + "." : "") + // '' is production | staging for 'staging' | 'uat' for uat
  (app_subdomain ? app_subdomain + "." : "") + // app_subdomain =  'agent' | 'join' | 'admin'
  baseHost; // localhost:3000 | realtyofamerica.com

export const MAKE_ABSOLUTE_URL = (route, id = "", token = "", type = "") => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  if (origin === "") return "#";

  const splitOrigin = origin.split(".");

  const protocol = origin.startsWith("http:") ? "http:" : "https:";
  const environment = origin.includes("staging-v2.")
    ? "staging-v2"
    : origin.includes("uat.")
    ? "uat"
    : "";
  const baseHost = origin.includes("localhost:")
    ? splitOrigin[splitOrigin.length - 1]
    : splitOrigin[splitOrigin.length - 2] +
      "." +
      splitOrigin[splitOrigin.length - 1];
  if (id) return route(protocol, environment, baseHost, id);
  if (type || token) return route(protocol, environment, baseHost, token, type);

  return route(protocol, environment, baseHost);
};

export const makeNetworkDetailPage = (isAdmin = false, id) =>
  isAdmin
    ? `/admin/revshare/network/${id}`
    : `/agent/my-revshare/network/${id}`;

export const REVSHARE_NETWORK_PAGE = `/agent/my-revshare/network/`;

// --- PATHS THAT NEED TO ABSOLUTE ---
// AGENT_ONBOARD_LOGIN
// AGENT_ONBOARD_SIGNUP
// AGENT_SIGN_UP_PAGE
// AGENT_DASHBOARD_PAGE
// ADMIN_LOGIN
// ADMIN_DASHBOARD
