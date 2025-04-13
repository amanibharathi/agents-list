// --------------------------------------------------
// ------------ AUTH API'S --------------------------
// --------------------------------------------------
export const POST_USER_CREATION = `/access/create-user/`
export const POST_LOGIN_API = `/access/login/`
export const POST_LOGOUT_API = '/access/logout/'
export const REFRESH_API = `/access/refresh/`
export const UPDATE_PASSWORD_API = '/access/password/update/'
export const UPDATE_USER_DATA_API = (id: string) =>
  `/access/user/profile/update/${id}/`
export const USER_PROFILE_DATA_API = '/access/user/profile/'
export const GET_FORGOT_PASSWORD_LINK = '/access/forget-password/'
export const POST_RESET_PASSWORD = (
  id?: string | null,
  token?: string | null
) => `/access/reset-password/${id}/${token}/`

// --------------------------------------------------
// ------------ WEB API'S --------------------------
// --------------------------------------------------
export const TEMPORARY_ALL_PROPERTY_SEARCH_API = '/web/property/search-all' //GET
export const PROPERTY_POLYGON_API = (id: string) =>
  `/web/property/polygon?ids=${id}`
export const PROPERTY_SEARCH_API = '/web/property/search' // GET
export const PROPERTY_SOLD_SEARCH_API = `/web/property/sales`
export const PROPERTY_SEARCH_META_API = '/web/property/search/meta' // GET
export const PROPERTY_DETAIL_API = (propertyId: string) =>
  `/web/property/get?property_id=${propertyId}` // GET
export const PROPERTY_SOLD_DETAIL_API = (propertyId: string) =>
  `/web/property/sales/get?property_id=${propertyId}` // GET
export const PROPERTY_SALE_HISTORY = (propertyId: string) =>
  `/web/property/sales-history?property_id=${propertyId}`
export const PROPERTY_RECENTLY_SOLD_NEARBY_API = () => `/web/property/sales`
export const POST_USER_CREATE_IN_SCHEDULE_TOUR = `/access/create-user/`
export const POST_GENERATE_ST_OTP = `/web/send-otp/`
export const POST_VALIDATE_ST_OTP = `/web/validate-otp/`
export const POST_SCHEDULE_TOUR = `/web/schedule-tour/`
export const PATCH_SCHEDULE_TOUR = (id: string) =>
  `/web/appointment/update/${id}/`
export const PROPERTY_NEARBY_PLACES_API = (lat: string, long: string) =>
  `/web/property/places?latitude=${lat}&longitude=${long}` //GET
export const PROPERTY_NEARBY_SCHOOLS_API = (lat: string, long: string) =>
  `/web/property/schools?latitude=${lat}&longitude=${long}` //GET
export const GET_UPCOMING_TOURS = `/web/appointment/list/`
export const GET_AGENTS_LIST_IN_USER_DASH = `/agent/list/`
export const POST_MAKE_AN_OFFER = `/web/make-an-offer/`
export const GET_OFFERS_MADE = '/web/lead/offer/list/'
export const GET_AGENTS_LIST_FOR_REVIEW = '/web/agent/review/list/'
export const USER_ENQUIRY_RESPONSE = (request_type: any) =>
  `/web/contact-request/list/?request_type=${request_type}`
export const POST_AGENT_REVIEW = `/web/agent/review/cud/`
export const POST_SET_EMAIL = `/agent/set-email/`
export const POST_SELL_PROPERTY = `/web/sell-property/`
export const GET_SELL_RATE = (address: string) =>
  `/web/property/sell-rate/?deliveryLine=${address}` //GET
export const GET_SELL_FIELD_DATA = `web/sell-property/meta/ `
export const POST_CTA_FORM = `/user/lead-contact/`
export const GET_ADDRESS_LIST_META = `/address/` //TODO
export const GET_AGENT_LIST = (type?: string) =>
  `/agent/list/?primary_state=${type}` //GET
export const POST_USER_PROFILE_PICTURE = '/access/profile-picture/upload/'
export const GET_SAVED_SEARCH_LIST = '/web/saved-search/list/'
export const GET_AGENT_RECENT_REVIEW = `/web/agent/recent-review/list/` //GET
export const GET_AGENT_DETAILS = (id: string) => `/web/agent/detail/${id}/` //GET
export const POST_SAVED_SEARCHES = `/web/save-search/cud/`
export const GET_SEARCH_META = (isSellFlow = false) =>
  `/web/property/search/meta${isSellFlow ? '/address/' : ''}`
export const GET_OPEN_HOUSE_LIST = '/web/open-house/list/'
export const OPEN_HOUSE_CD_API = () => `/web/open-house/cd/` // POST
export const OPEN_HOUSE_DELETE_API_2 = (id: string) =>
  `/web/open-house/cd/${id}/`
export const OPEN_HOUSE_DELETE_API = (id: string) =>
  `/web/open-house/delete/${id}/`
export const MY_OPEN_HOUSES_ID_LIST_API = (id: string) =>
  `/web/all-open-house/` + id // GET
export const GET_OWNER_HOUSES_LIST = `/web/owner-house/list/`
export const POST_ASK_AGENT = '/web/ask-agent/' // POST
export const GET_PROP_LISTED_BY_AGENT = (agent_id: string, status: string) =>
  `/web/property/search?agent_id=${agent_id}&status=${status}`
export const POST_OWNER_HOUSE_ADD = `/web/owner-house/cd/`
export const POST_JOIN_AGENT = `/admin/join-as-agent/create/`
export const GET_SELL_PROPERTY_AGENT = `/web/sell-property/agent/`
export const GET_SAVED_SEARCH_AND_MY_HOMES_FOR_SEARCH =
  '/web/property/save-search/meta/'
export const GET_SEARCH_META_FOR_AGENT = `/meta/state/list/`
export const GET_OWNER_HOUSES_LIST_META = `/web/owner-house/meta/`
export const GET_RECOMMENTATION_LIST = `/web/property/recommendation`
export const GET_FEED_LIST = `web/property/feeds`
export const GET_CITIES_LIST = `/web/city/list/`
export const GET_TOURS_SCHEDULED_META_API = (id: string) =>
  `/web/property/scheduled/${id}`
export const GET_REVSHARE_UPLOAD_LIST = `/rev-share/file/list/`
export const GET_REVSHARE_UPLOAD_LIST_META = `/rev-share/file/list/table-meta/`
export const GET_REVSHARE_FILE_UPLOAD_META = `/rev-share/file/upload/meta/`
export const POST_REVSHARE_FILE_UPLOAD = `/rev-share/file/upload/`

export const CREATE_LEAD_WEB_API = '/web/lead/create/'
export const GET_SCHEDULE_META = `/web/lead/create/`
export const GET_PRE_APPROVED_QUESTIONS = `/web/mortgage/questions/list/`

// ----------------- FAVORITES --------------------
export const TOGGLE_FAVORITES_API = '/web/toggle-favorites/' // POST
// export const GET_FAVORITES_API = '/web/all-favorites/' //GET
export const GET_FAVORITES_META_API = '/web/toggle-favorites/meta/' // GET
export const FAVORITES_LIST_API = '/user/favorites-list/' // GET
export const GET_INDIVIDUAL_FAV_LIST = (id: string) => `/user/favorites/${id}/`
export const CUD_FAV_LIST = (id?: string | number) =>
  `/user/favorites-list/cud/${`${id ? id + '/' : ''}`}`
export const POST_REMOVE_FAV_IN_USERDASH = '/user/remove-favorite/'
// --------------------------------------------------
export const GET_FAVORITES_API = '/web/all-favorites/'
export const ADD_FAVORITE = '/web/add-favorite/'
export const REMOVE_FAVORITE = '/web/remove-favorite/'
export const FAVORITE_COLLECTIONS_CUD = (ID?: string) =>
  `/web/favorite-collection/cud/${ID ? ID + '/' : ''}`
export const FAVORITE_COLLECTION_LIST = '/web/favorite-collection/list/'
export const FAVORITE_COLLECTION_DETAIL = (ID: string) =>
  `/web/favorite-collection/detail/${ID}/`
// --------------------------------------------------

export const GET_TREND_PRICE = `/web/property/price/trends`
export const GET_TREND_SOLD = `/web/property/sold/trends`
export const GET_TREND_MARKET = `/web/property/days-on-market/trends`

// --------------------------------------------------
// ------------ RESOURCES API'S ---------------------
// --------------------------------------------------
export const WEB_RESOURCES_LIST_API = `/admin/resource/list/`
export const WEB_RESOURCES_INDIVIDUAL_BLOG_API = (id: number) =>
  `/admin/resource/detail/${id}/`

// --------------------------------------------------
// ------------ AGENT API'S --------------------------
// --------------------------------------------------
export const GET_AGENT_DASHBOARD_DATA = '/agent/dashboard/'
export const GET_LEADS_LIST_AGENT_DASH = `/agent/lead/list/`
export const GET_LEADS_LIST_META_AGENT_DASH = `/agent/lead/list/table-meta/`
export const GET_LEADS_DETAILS_BY_ID = (id: string) => `/web/lead/detail/${id}/`
export const GET_LEAD_CREATION_META = `/agent/lead-create/meta/`
export const POST_LEAD_CREATION_BY_AGENT = `/agent/lead-create/`
export const GET_AGENTS_ACTIVITY_LIST_BY_TYPE = (type: string, id: string) =>
  `/agent/lead/${type}/list/${id}/`
export const CUD_LEAD_ACTIVITY = (slug: string, id?: string | number) =>
  `/agent/lead/${slug}/cud/${id ? `${id}/` : ''}`
export const CUD_USER_DASH = (slug: string, id?: string | number) =>
  `/web/${slug}/${id ? `${id}/` : ''}`
export const SAVED_SEARCH_CUD = (ID: number) => `/web/save-search/cud/${ID}/`
export const CUD_LEAD_CREATION = `/agent/lead-communication-log/cud/`
export const GET_LEAD_LISTING = (lead_enquiry: string, type?: string) =>
  `/agent/lead-communication-log/list/?is_replied=false${lead_enquiry ? `&lead=${lead_enquiry}` : ''}${type ? `&communication_type=${type}` : ''}`
export const DELETE_CUD = (id: number) =>
  `/agent/lead-communication-log/cud/${id}/`
export const LEAD_PROFILE_TAB_LIST = (tab: string, user_id: number) => {
  if (tab === 'favorite') return `/web/favorite-property/${user_id}/list/`
  else if (tab === 'offered-property')
    return `/web/lead/offer/list/?user=${user_id}`
  return `/web/${tab}/list/?user=${user_id}`
}
export const LEAD_PROFILE_TAB_LIST_META = (tab: string, user_id: number) => {
  if (tab === 'favorite')
    return `/web/favorite-property/${user_id}/list/table-meta/`
  else if (tab === 'offered-property') return `/web/lead/offer/list/table-meta/`
  return `/web/${tab}/list/table-meta/`
}
export const LEAD_NOTE_LIST = (id: number) =>
  `/agent/lead/notes/list/?lead=${id}`
export const LEAD_NOTE_POST = `/agent/lead/notes/cud/`
export const LEAD_NOTE_DELETE = (id: number) => `/agent/lead/notes/cud/${id}/`
export const LEAD_TOUR_LIST = (id?: number) =>
  `/web/appointment/list/${id ? `?lead=${id}` : ''}`
export const LEAD_TOUR_STATUS_UPDATE = (id?: string) =>
  `/web/appointment/update/${id}/`
export const LEAD_GET_STATUS_META = `/web/appointment/list/table-meta/`
export const LEAD_STAGE_UPDATE = (id: number) => `/agent/lead/update/${id}/`
export const AGENT_DASHBOARD_ACTIVITY = `/web/recent-activity/list/`
export const AGENT_UPDATE_META = (id: number) =>
  `/access/user/profile/update/${id}/meta/`
export const ENQUIRY_RESPONSE = (id: any, request_type: any) =>
  `/web/contact-request/list/?request_type=${request_type}&lead__user=${id}`
export const ENQUIRY_META = `/web/contact-request/list/table-meta/`
export const LEAD_LISTING_REPLY = (id: any) =>
  `/agent/lead-communication-log/list/?replied_to=${id}`
export const AGENT_TEAM_DOCUMENT_POST = `/agent/team/document/file/upload/`
export const AGENT_TEAM_FORM_POST = `/agent/onboard/`
export const AGENT_SIGN_UP_INDIVIDUAL_API = `/agent/individual/onboard/`
export const GET_AGENT_STAGE_LIST = `/agent/stage/list/`
export const GET_AGENT_STAGE_FORM = (id: any) => `/form/view/${id}/`
export const POST_AGENT_STAGE_FORM = `/form/response/cud/`
export const UPDATE_STAGE_ONBOARDING = (id: any) => `/agent/stage/update/${id}/`
export const GET_AGENT_STAGE_LICENSE_LIST_ONBOARD = () => `/agent/license/list/`
export const GET_AGENT_STAGE_MLS_LIST_ONBOARD = () => `/agent/mls/list/`
export const EMAIL_TRIGGER_AGENT = () => `agent/send-application/status/mail/`

export const POST_CHECKLIST_RESPONSE = `/agent/checklist-response/cd/`
export const DELETE_CHECKLIST_RESPONSE = (id: any) =>
  `/agent/checklist-response/cd/${id}/`
export const GET_CHECKLIST_RESPONSE_LIST = `/agent/checklist-response/list/`
export const SIGN_YOUR_ICA_GET = (id: any) =>
  `/agent/esign-contract/request/${id}/`
export const E_SIGN_CONTRACT_STATUS_UPDATE = (id: any) =>
  `/agent/esign-contract/status/update/${id}/`
export const STRIP_PAYMENT_INSTANT = `/payment/initiate/`
export const GET_INITIAL_USER_DETAILS = (id: any) =>
  `/access/user/initial/details/${id}/`
export const GET_TOOL_LIST = (id?: any) =>
  `/tool/list/${id ? `?user=${id}` : ''}`
export const CHOOSE_TOOLS = `/user/tool/create/`
export const GET_AGENT_SUPPORT_DOCUMENT_LIST = `/agent/support/document/list/`
export const POST_AGENT_SUPPORT_DOCUMENT = `/agent/support/document/`
export const DELETE_AGENT_SUPPORT_DOCUMENT = (id: any) =>
  `/agent/support/document/${id}/`
export const DELETE_TOOLS_CUD = `/user/tool/remove/`
export const AGENT_WEBSITE_DETAIL_WEB = (slug: any) => `/agent/website/${slug}/`
export const AGENT_ROA_EMAIL_GENERATE = `/agent/generate-roa-email/`
export const AGENT_STAGE_FOUR_API = `/agent/stage-four/status/update/`
export const POST_CMS_PROFILE_PICTURE = '/agent/website/profile-picture/upload/'
export const GET_FORWARDING_EMAIL_STATUS = (id: string) =>
  `/agent/forward-email/status/${id}/`
export const POST_FORWARDING_EMAIL = `/agent/forward-email/update/`

// --------------------------------------------------
// ------------ ADMIN API'S -------------------------
// --------------------------------------------------
export const GET_ADMIN_DASHBOARD_DATA = `/admin/dashboard/`
export const GET_LEADS_LIST_IN_ADMIN = `/web/lead/list/`
export const GET_LEADS_LIST_META_IN_ADMIN = `/web/lead/list/table-meta/`
export const POST_AGENT_ASSIGN_AND_REMOVE = (type = 'assign-agent') =>
  `/admin/${type}/`
export const GET_ASSIGN_AGENT_META = `/admin/assign-agent/meta/`

export const GET_ALL_AGENTS_LIST_IN_ADMIN = `/agent/list/`
export const GET_AGENTS_LIST_IN_ADMIN = (is_applied = false) =>
  `/agent/list/${is_applied ? '?is_applied=true' : ''}`
export const GET_AGENTS_LIST_META_IN_ADMIN = (is_applied = false) =>
  `/agent/list/table-meta/${is_applied ? '?is_applied=true' : ''}`
export const GET_BECOME_AN_AGENT_LIST_IN_ADMIN = `/admin/join-as-agent/list/`
export const GET_BECOME_AN_AGENT_META_IN_ADMIN = `/admin/join-as-agent/list/table-meta/`
export const GET_AGENT_INDIVIDUAL_DATA = (id: string | number) =>
  `/admin/agent/dashboard/${id}/`
export const GET_ASSIGN_TEAM_IN_ADMIN = (is_applied = false) =>
  `/team/list/${is_applied ? '?is_applied=true' : ''}`
export const GET_ASSIGN_TEAM_META = (is_applied = false) =>
  `/team/list/table-meta/${is_applied ? '?is_applied=true' : ''}`

export const GET_BLOGS_LIST_IN_ADMIN = `/admin/resource/list/`
export const GET_BLOGS_LIST_META_IN_ADMIN = `/admin/resource/list/table-meta/`

export const GET_TAGS_LIST_IN_ADMIN = `/admin/tag/list/`
export const GET_TAGS_LIST_META_IN_ADMIN = `/admin/tag/list/table-meta/`
export const GET_DETAIL_DATA = (type: string, id: string | number) =>
  `/admin/${type}/detail/${id}/`
export const RESOURCE_CUD_API = (
  type: string,
  id?: string | number,
  isMeta?: boolean
) => `/admin/${type}/cud/${id ? id + '/' : ''}${isMeta ? 'meta/' : ''}`
export const POST_FILE = (type: string, fileType?: string) =>
  `/admin/${type}/${fileType || 'file'}/upload/`

export const GET_EMAIL_SUBS_LIST_IN_ADMIN = `/admin/email-subscription/list/`
export const GET_EMAIL_SUBS_LIST_META_IN_ADMIN = `/admin/email-subscription/list/table-meta/`
export const GET_ADMINS_LEADS_DETAILS_BY_ID = (id: string) =>
  `/admin/lead/detail/${id}/`
export const POST_ADMINS_AGENT_CREATION = `/admin/agent/cud/`
export const PUT_ADMINS_AGENT_UPDATE = (id: any) => `/admin/agent/cud/${id}/`
export const SPONSOR_UPDATE = `/agent/sponsor/update/`
export const GET_ADMINS_AGENT_CREATION_META = `/admin/agent/cud/meta/`
export const GET_CREATE_ROLE_META = `/`
export const CUD_ADMIN_ROLES = (id?: number | string, isMeta?: boolean) =>
  `/admin/roles/cud/${id ? id + '/' : ''}${isMeta ? 'meta/' : ''}`
export const POST_GENERATE_REPORT = () => `/report/create/`
export const GET_EXPORT_DATA = () => `/admin/export/`
export const GET_ADMIN_AGENT_DETAILS = (id: any) => `admin/agent/detail/${id}/`
export const GET_SYSTEM_LOG = `/web/system-log/list/`

export const ADMIN_FORM_BUILDER_TEMLATE_GET = `/form/template/list/`
export const ADMIN_FORM_BUILDER_TEMLATE_CUD = `/form/template/cud/`
export const ADMIN_FORM_BUILDER_FORM_GET = (id: any) =>
  `/form/group/list/${id ? `?form_template=${id}` : ''}`
export const ADMIN_FORM_BUILDER_FORM_CUD = `/form/group/cud/`
export const ADMIN_FORM_BUILDER_SUB_FORM_GET = (id: any) =>
  `/form/sub-group/list/${id ? `?form_group=${id}` : ''}`
export const ADMIN_FORM_BUILDER_FORM_QUESTION_GET = (id: any) =>
  `/form/question/list/${id ? `?form_sub_group__form_group=${id}` : ''}`
export const ADMIN_FORM_BUILDER_SUB_FORM_CUD = `/form/sub-group/cud/`
export const ADMIN_FORM_BUILDER_QUESTIONARIES_GET = (id: any) =>
  `/form/question/list/${id ? `?form_sub_group=${id}` : ''}`
export const ADMIN_FORM_BUILDER_QUESTIONARIES_CUD = `/form/question/cud/`
export const ADMIN_FORM_BUILDER_QUESTIONARIES_CUD_META = `/form/question/cud/meta/`
export const ADMIN_AGENT_TEAM_CREATE = `/team/create/`
export const ADMIN_AGENT_TEAM_MEMBERS_LIST = `/admin/unassigned-agent/list/`
export const ADMIN_AGENT_MLS_LIST = `/meta/mls/list/`
export const ADMIN_AGENT_STATE_LIST = `/meta/state/list/`
export const ADMIN_AGENT_BOARD_LIST = `/meta/board/list/`
export const ADMIN_AGENT_TEAM_DETAIL = (id: any, is_applied = false) =>
  `/team/detail/${id}/${is_applied ? '?is_applied=true' : ''}`
export const GET_ADMIN_TEAM_MEMBERS_LIST = (id: any) =>
  `/team/${id}/member/list/`
export const GET_ADMIN_TEAM_MEMBERS_LIST_META = (id: any) =>
  `/team/${id}/member/list/table-meta/`
export const ADMIN_AGENT_DETAIL_GET = (id: any) => `/admin/agent/detail/${id}/`
export const ADMIN_AGENT_DETAIL_GET_META = (id: any) =>
  `/admin/agent/cud/${id}/meta/`
export const ADMIN_AGENT_STAGE_GET = (id: any) =>
  `/agent/stage/list/?user=${id}`
export const ADMIN_AGENT_TEMPLATE_GET = (id: any, templateId: any) =>
  `/form/${templateId}/response/${id}/`
export const ADMIN_AGENT_TEAM_UPDATE = (id: any) => `/team/update/${id}/`
export const GET_ADMINS_AGENT_ROLE_META = `/team/member/cd/meta/`
export const ADMIN_AGENT_MEMBER_CREATE = `/team/member/cd/`
export const REMOVE_ADMIN_AGENT_TEAM_MEMBER = (id: any) =>
  `/team/member/cd/${id}/`
export const ADMIN_AGENT_TEAM_LIST = `/team/list/`
export const GET_ADMIN_BROKERAGE_TEAMS_LIST = (id: any) =>
  `/team/list/?brokerage=${id}`
export const AGENT_NOTES_LIST = () => `/agent/stage/review/list/`
export const AGENT_NOTES_CREATE = `/agent/stage/review/create/`
export const GET_ADMINS_ONBOARD_TYPE_META = `/admin/agent/cd/meta/`
export const ADMIN_CREATE_TEAM_MEMBER_AGENT = (id?: any) =>
  `/admin/agent/cd/${id ? id + '/' : ''}`
export const AGENT_STAGE_STATUS_UPDATE = (id: any) =>
  `/agent/stage/update/${id}/`
export const GET_AGENT_STAGE_LICENSE_LIST = (id: any) =>
  `/agent/license/list/?user=${id}`
export const GET_AGENT_STAGE_MLS_LIST = (id: any) =>
  `/agent/mls/list/?user=${id}`
export const POST_AGENT_MLS_LICENSE_STATUS_UPDATE = `/agent/mls-license/status/update/`
export const POST_AGENT_AND_TEAM_BULK_UPLOAD = `/admin/agent/bulk-upload/create/`
export const ADMIN_AGENT_ON_BOARDING_UPDATE = `/admin/agent/status/update/`
export const ADMIN_E_SIGNED_VIEW = (id: any) =>
  `/agent/esign-contract/view/document/${id}/`
export const ADMIN_BULK_LIST_DOCUMENT = `/admin/agent/bulk-upload/list/`
export const ADMIN_BULK_LIST_DOCUMENT_META = `/admin/agent/bulk-upload/list/table-meta/`
export const ADMIN_TEAM_LIST_SEND_INVITE = `/admin/agent/send-invite/`
export const ADMIN_TEAM_DOCUMENT_LIST = (id: any) =>
  `/team/${id}/document/list/`
export const ADMIN_TEAM_DOCUMENT_LIST_META = (id: any) =>
  `/team/${id}/document/list/table-meta/`
export const AGENT_RECURITING_JOIN_AS_AGENT = `/agent/join/request/cd/`
export const GET_TEAM_ACTIVITY_LOG_LIST = `/team/activity-log/list/`
export const POST_REASSIGN_TEAM_MEMBER = `/team/member/reassign/`
export const REMOVE_TEAM_AGENT = `/team/member/remove/`
export const REMOVE_OFFICE_AGENT = `/brokerage/member-team/remove/`
export const GET_ADMIN_AGENT_PAYMENT_DETAILS = `/payment/list/`
export const POST_AGENT_FORWARD_EMAIL = `/agent/forward-email/update/`
export const SPONSOR_LIST_API = `admin/sponsor/list/`
export const GET_AGENT_SUMMARY_DETAILS = (id: any) =>
  `/admin/agent/summary/${id}/`
export const GET_ADMIN_DASHBOARD_GRAPH = `/admin/dashboard/graph/`
export const GET_NOTIFICATION_TRIGGER = `/agent/send/license-notification/mail/`
export const GET_OKTA_USER_GROUP = `/admin/okta-group/list/`
export const GET_OKTA_SYNC_LIST = `/admin/okta/user/list/`
export const GET_OKTA_TABLE_META = `/admin/okta/user/list/table-meta/`
export const SYNC_OKTA = `/admin/okta/sync/`

export const AGENT_DOCUMENT_UPLOAD = `/admin/agent-document/cd/`
export const ADMIN_AGENT_DOCUMENTS_LIST_META = `/admin/agent-document/list/table-meta/`
export const ADMIN_AGENT_DOCUMENTS_LIST = (id: any) =>
  `/admin/agent-document/list/?user=${id}`
export const ADMIN_AGENT_DOCUMENT_DELETE = (id: any) =>
  `/admin/agent-document/cd/${id}/`
export const POST_BROKERAGE_DOCUMENT_UPLOAD = `/brokerage/document/upload/`

export const GET_ADMIN_EMAIL_REMIANDER_TABLE_META = `/email-reminder/list/table-meta/`
export const GET_ADMIN_EMAIL_REMAINDER_LIST = `/email-reminder/list/`
export const CUD_ADMIN_EMAIL_REMAINDER = `/email-reminder/cud/`
export const DELETE_ADMIN_EMAIL_REMAINDER = (id: any) =>
  `/email-reminder/cud/${id}/`
export const POST_TRIGGER_ADMIN_EMAIL_REMAINDER = (id: any) =>
  `/email-reminder/${id}/trigger/`
export const GET_EMAIL_REMAINDER_META = `/email-reminder/cud/meta/`
export const GET_LOG_LIST_META = `/email-reminder/log/list/table-meta/`
export const GET_LOG_LIST = `/email-reminder/log/list/`
export const GET_LICENSE_INSTRUCTION_LIST_META = `/meta/license-instruction/list/table-meta/`
export const GET_LICENSE_INSTRUCTION_LIST = `/meta/license-instruction/list/`
export const POST_LICENSE_INSTRUCTION = `/meta/license-instruction/cud/`
export const UPDATE_LICENSE_INSTRUCTION = (id: any) =>
  `/meta/license-instruction/cud/${id}/`
export const POST_SIGN_REQUEST = `/agent/send-signature-request/`
export const GET_AGENT_SIGNATURE_REQUEST_LIST = `/agent/signature-request/list/`
// --- ADMIN - MANAGING & ONBOARD ADMIN ---
export const GET_LICENSE_TRANSFER_META = (access_type?: string) =>
  `/admin/transfer-license/list/table-meta/${access_type ? `?access_type=${access_type}` : ''}`
export const GET_MLS_BOARD_META = `/admin/transfer-mls/list/table-meta/`
export const GET_LICENSE_TRANSFER_LIST = (val: string, access_type?: string) =>
  `/admin/transfer-license/list/?transfer_list=${val}&access_type=${access_type}`
export const GET_MLS_BOARD_LIST = (val: string, access_type?: string) =>
  `/admin/transfer-mls/list/?transfer_list=${val}&access_type=${access_type}`
export const GET_ADMIN_NEW_APPLICANTS_LIST = `/admin/new-applicant/list/`
export const GET_ADMIN_LAST_ACTION = `/admin/last-action/list/?last_active=3`
export const GET_AGENT_FORWARD_EMAIL_STATUS = (id: any) =>
  `/agent/forward-email/status/${id}/`
export const GET_LOG_LIST_FILE_DOWNLOAD = `/email-reminder/user/export/`
export const GET_AGENT_TEAM_STATUS = `/team/status/`
export const GET_AGENT_TEAM_NOTES_LIST = `/team/notes/list/`
export const POST_AGENT_TEAM_NOTES = `/team/notes/create/`

// --- ADMIN - ROA -BROKERAGE ----

export const GET_ADMIN_BROKERAGE_TABLE_META = `/brokerage/list/table-meta/`
export const GET_ADMIN_BROKERAGE_LIST = `/brokerage/list/`
export const POST_ADMIN_CREATE_BROKERAGE = `/brokerage/cud/`

export const ADMIN_AGENT_ASSIGN_OFFICE_BROKERAGE_POST =
  '/brokerage/member-team/assign/'
export const AGENT_RECURITING_JOIN_AS_AGENT_TYPE_META = `/agent/join/request/cd/meta/`

export const GET_ADMIN_BROKERAGE_MEMBER_LIST_META = (id: any) =>
  `/brokerage/${id}/member/list/table-meta/`

export const GET_ADMIN_BROKERAGE_MEMBER_LIST = (id: any) =>
  `/brokerage/${id}/member/list/`
export const REPORT_CREATE_META = `/report/create/meta/`
export const ADMIN_REPORT_LIST = `/report/list/`
export const ADMIN_REPORT_LIST_META = `/report/list/table-meta/`
export const ADMIN_TOOLS_LIST = `/tool/list/`
export const ADMIN_TOOLS_LIST_META = `/tool/list/table-meta/`
export const ADMIN_TOOLS_TYPE_META = `/tool/cud/meta/`
export const ADMIN_TOOLS_CREATE = `/tool/cud/`
export const ADMIN_TOOLS_IMAGE_UPLOAD = `/tool/image/upload/`
export const ADMIN_TOOLS_UPDATE = (id: any) => `/tool/cud/${id}/`
export const ADMIN_GET_TEMPLATE_LIST = (acknowledge?: any) =>
  `/admin/esign/template/list/${acknowledge ? `?ica_acknowledgement=${acknowledge}` : ''}`
export const ADMIN_FAQ_TOPIC_UPDATE_OR_DELETE = (id?: any) =>
  `/faq/topic/cud/${id}/`
export const ADMIN_FAQ_TOPIC_CREATE = `/faq/topic/cud/`
export const ADMIN_FAQ_TOPIC_LIST = `/faq/topic/list/`
export const ADMIN_FAQ_TOPIC_LIST_META = `/faq/topic/list/table-meta/`
export const ADMIN_FAQ_UPDATE_META = (id: any) => `/faq/cud/${id}/meta/`
export const ADMIN_FAQ_LIST = `/faq/list/`
export const ADMIN_FAQ_LIST_META = `/faq/list/table-meta/`
export const ADMIN_FAQ_UPDATE_OR_DELETE = (id?: any) => `/faq/cud/${id}/`
export const ADMIN_FAQ_CREATE = `/faq/cud/`
export const ADMIN_GET_STATE = `/meta/state/list/`
export const ADMIN_GET_META_STATE = `/meta/state/list/table-meta/`
export const ADMIN_CREATE_STATE = (id?: any) =>
  `/meta/state/cud/${id ? id + '/' : ''}`
export const ADMIN_GET_ONE_STATE = (id: any) => `/meta/state/cud/${id}/meta/`
export const ADMIN_MG_LIST = `/marketing-group/list/`
export const ADMIN_MG_LIST_META = `/marketing-group/list/table-meta/`
export const ADMIN_MG_CUD_API = (
  type: string,
  id?: string | number,
  isMeta?: boolean
) => `/${type}/cud/${id ? id + '/' : ''}${isMeta ? 'meta/' : ''}`
export const GET_MG_DETAIL_DATA = (type: string, id: string) =>
  `/${type}/detail/${id}/`
export const POST_MG_FILE_UPLOAD = `/marketing-group/document/upload/`
export const GET_MG_LIST_IN_ADMIN = `/marketing-group/list/`
export const GET_MG_LIST_META_IN_ADMIN = `/marketing-group/list/table-meta/`
export const GET_MG_DETAIL_LIST = (
  id: string,
  isMeta: boolean = false,
  module: string = 'member'
) => `/marketing-group/${id}/${module}/list/${isMeta ? 'table-meta/' : ''}`
export const POST_REMOVE_FROM_MG = `/marketing-group/member/remove/`
export const POST_ASSIGN_MEMBERS_TO_MG = `/marketing-group/member/assign/`
export const POST_UPLOAD_DOCS_TO_MG = `/marketing-group/document/upload/`

export const GET_ADMIN_SMS_CAMPAIGN_LIST_META = `/campaign/list/table-meta/`
export const GET_ADMIN_SMS_CAMPAIGN_LIST = `/campaign/list/`
export const GET_ADMIN_SMS_CAMPAIGN_CREATE_META = `/campaign/cud/meta/`
export const ADMIN_CAMPAIGN_CUD = (id?: any) =>
  `/campaign/cud/${id ? `${id}/` : ''}`
export const POST_TRIGGER_ADMIN_SMS_CAMPAIGN = (id: any) =>
  `/campaign/${id}/trigger/`
export const GET_LOG_LIST_META_SMS_CAMPAIGN = (id: any) =>
  `/campaign/${id}/log/list/table-meta/`
export const GET_LOG_LIST_SMS_CAMPAIGN = (id: any) =>
  `/campaign/${id}/log/list/`
export const GET_ADMIN_SMS_CAMPAIGN_UPDATE_META = (id: any) =>
  `/campaign/cud/${id}/meta/`
export const GET_ADMIN_SMS_CAMPAIGN_USER_LIST = `/campaign/agent/list/`
export const GET_ADMIN_SMS_CAMPAIGN_USER_LIST_META = `/campaign/agent/list/table-meta/`
export const GET_ADMIN_BROKERAGE_DOCUMENT_LIST = (
  isMeta: boolean = false,
  id: any
) => `/brokerage/${id}/document/list/${isMeta ? `table-meta/` : ''}`
export const AGENT_TEAM_CUD_API = (id?: string | number, isMeta?: boolean) =>
  `/team/cud/${id ? id + '/' : ''}${isMeta ? 'meta/' : ''}`
// export const GET_TEAM_AGENT_LIST = '/team/unassigned/agent/list/'
export const GET_TEAM_AGENT_LIST = '/team/agent/list/'
export const ADMIN_TEAM_DOCUMENT_UPLOAD = `/team/file/upload/`
export const ADMIN_TEAM_CUD = (id?: any) => `/team/cud/${id ? `${id}/` : ''}`
export const ADMIN_TEAM_MEMBER_DETAIL = (team: string, member: string) =>
  `/team/${team}/member/detail/${member}/`
export const ADMIN_TEAM_MEMBER_UPDATE_META = (id: any, user?: any) =>
  `/team/${id}/member/cd/meta/${user ? `?user=${user}` : ''}`
export const ADMIN_TEAM_MEMBER_UPDATE = (team: string, member: string) =>
  `/team/${team}/member/update/${member}/`
export const ADMIN_TEAM_MEMBER_DELETE = (team: string, member: string) =>
  `/team/${team}/member/cd/${member}/`
export const ADMIN_TEAM_MEMBER_CREATE = (team: string) =>
  `/team/${team}/member/cd/`
// export const ADMIN_TEAM_UNASSIGNED_AGENT_LIST = `/team/unassigned/agent/list/`
export const ADMIN_TEAM_DOCUMENT_UPLOAD_CREATE = (id: any) =>
  `/team/${id}/document/create/`
export const ADMIN_TEAM_DOCUMENT_UPLOAD_DELETE = (id: any) =>
  `/team/${id}/document/delete/`
export const ADMIN_GET_TEAM_REQUEST_TABLE_META = (request?: any) =>
  `/team/request/list/table-meta/${request ? `?request_type=${request}` : ''}`
export const ADMIN_GET_TEAM_REQUEST_TABLE_LIST = (
  status?: any,
  request?: any
) =>
  `/team/request/list/${status ? `?status=${status}` : ''}${request ? `&request_type=${request}` : ''}`
export const ADMIN_TEAM_REQUEST_UPDATE = (teamId: any, requestId: any) =>
  `/team/${teamId}/request/status/update/${requestId}/`
export const ADMIN_JOIN_REQUEST_DELETE = (id: any) =>
  `/agent/join/request/cd/${id}/`
export const ADMIN_TEAM_REQUEST_LIST = (teamId: any) =>
  `/team/request/list/?team=${teamId}`
export const ADMIN_TEAM_REQUEST_LIST_META = (teamId: any) =>
  `/team/request/list/table-meta/?team=${teamId}`
export const ADMIN_TEAM_REQUEST_DETAIL = (teamId: any, requestId: any) =>
  `/team/${teamId}/request/detail/${requestId}/`
export const ADMIN_TEAM_MEMBER_DELETE_META = (teamId: any, agentId: any) =>
  `/team/${teamId}/member/cd/${agentId}/delete-meta/`
export const GET_ADMIN_ROLES_AND_RESPONSIBILITIES_TABLE_META = `/access/control/role/list/table-meta/`
export const GET_ADMIN_ROLES_AND_RESPONSIBILITIES_LIST = `/access/control/role/list/`
export const ROLES_AND_RESPONSIBILITIES_ADMIN_CUD = (id?: any) =>
  `/access/control/role/cud/${id ? `${id}/` : ''}`
export const ROLES_AND_RESPONSIBILITIES_ADMIN_CUD_META = (id?: any) =>
  `/access/control/role/cud/${id ? `${id}/meta/` : 'meta/'}`
export const GET_ADMIN_USER_AND_ROLES_TABLE_META = `/access/control/role/user/list/table-meta/`
export const GET_ADMIN_USER_AND_ROLES_LIST = `/access/control/role/user/list/`
export const GET_ADMIN_USER_AND_ROLES_DETAIL = (id: any) =>
  `/access/control/role/user/detail/${id}/`
export const ADMIN_USER_ROLE_ASSIGN_OR_CHANGE = (id?: any) =>
  `/access/control/user-role/cud/${id ? `${id}/` : ''}`
export const ADMIN_DELETE_BROKERAGE = (id: any) => `/brokerage/cud/${id}/`
export const ADMIN_USER_ROLES_CREATE = `/access/admin/cud/`
// --------------------------------------------------------
export const SEARCH_PROPERTY_ON_GOOGLE_API =
  'https://places.googleapis.com/v1/places:searchText'
export const AUTO_COMPLETE_ON_GOOGLE_API = `https://places.googleapis.com/v1/places:autocomplete/`

export const CANNY_SSO_GENERATION = `/agent/generate/sso-token/`

// --------------------------------------------------
// ---------------- SOCIAL AUTH ---------------------
// --------------------------------------------------
export const SSO_GOOGLE_LOGIN_AUTH_API = '/access/google/login/'
export const SSO_GOOGLE_VERIFY_API = '/access/google/callback/'
export const SSO_OKTA_LOGIN_AUTH_API = '/access/okta/login/'
export const SSO_OKTA_VERIFY_API = '/access/okta/callback/'
// -----------------------------------------------

// --------------------------------------------------
// ---------------- AGENT DASHBOARD API ---------------------
// --------------------------------------------------

//feature:brokerage
export const AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_LIST = `/brokerage/list/`

export const AGENT_DASHBOARD_OFFICE_OR_BROKERAGE_DETAIL = (id: any) =>
  `/brokerage/detail/${id}/`
export const AGENT_DASHBOARD_AGENT_PROFILE_DETAIL = (id: any) =>
  `/web/agent/detail/${id}/`
export const AGENT_DASHBOARD_AGENT_PROFILE_UPDATE = (id: any) =>
  `/access/user/profile/update/${id}/`
export const AGENT_DASHBOARD_USER_LIST = `/access/user/list/`
export const AGENT_DASHBOARD_AGENT_PROFILE_UPDATE_META = (id: any) =>
  `/access/user/profile/update/${id}/meta/`
export const GET_AGENT_PROFILE_WORK_WITH = `/meta/agent-work-type/list/`
export const AGENT_WEBSITE_CREATE = (id: any) => `/agent/website/update/${id}/`
export const AGENT_WEBSITE_DETAIL = (slug: any) =>
  `/agent/website/retrieve/${slug}/`
export const AGENT_WEBSITE_THEME_IMAGE_LIST = `/agent/theme-image/list/`
export const AGENT_WEBSITE_SLUG_CREATE = `/agent/generate/username/`
export const AGENT_WEBSITE_BANNER_IMAGE_UPLOAD = `/agent/theme-image/create/`
export const GET_AGENT_PROFILE_CERTIFICATE = `/meta/agent-certificate/list/`
export const POST_AGENT_FORWARDING_EMAIL = `/agent/set-forwarding-mail/`
export const AGENT_WEBSITE_BANNER_LIST = `/agent/theme-image/list/`
export const AGENT_WEBSITE_ICON_LIST = `/agent/website/featured-content-icon/list/`
export const AGENT_WEBSITE_HERO_CONTENT_LIST = `/agent/website/hero-content/list/`
export const AGENT_WEBSITE_ABOUT_CONTENT = `/agent/website/bio/list/`
export const AGENT_WEBSITE_FEATURE_CONTENT_TITLE = `/agent/website/featured-content-title/list/`
export const AGENT_WEBSITE_FEATURE_CONTENT_ITEM = `/agent/website/featured-content-item/list/`
export const CUD_AGENT_WEBSITE_HERO_CONTENT = (id?: any) =>
  `/agent/website/hero-content/cud/${id ? `${id}/` : ''}`
export const CUD_AGENT_WEBSITE_ABOUT_CONTENT = (id?: any) =>
  `/agent/website/bio/cud/${id ? `${id}/` : ''}`
export const CUD_AGENT_WEBSITE_FEATURE_ITEM_CONTENT = (id?: any) =>
  `/agent/website/featured-content-item/cud/${id ? `${id}/` : ''}`
export const CUD_AGENT_WEBSITE_FEATURE_TITLE_CONTENT = (id?: any) =>
  `/agent/website/featured-content-title/cud/${id ? `${id}/` : ''}`
export const AGENT_WEBSITE_UPDATE_META = (id: any) =>
  `/agent/website/update/${id}/meta/`
// public sign ica api
export const SIGN_PUB_ICA_GET = (id: any) => `/agent/signature-url/${id}/`
// RevShare FAQ Popular topics list
export const GET_REVSHARE_FAQ_TOPICS = `/faq/topic/list/`
// RevShare FAQ list
export const GET_REVSHARE_FAQ_LIST = `/faq/list/`
//RevShare Dash
export const GET_REVSHARE_DASH_DATA = `/rev-share/dashboard/`
//RevShare Network tab list
export const GET_REVSHARE_NETWORK_LIST = `/rev-share/network/member/list/`
//RevShare Network tab list
export const GET_REVSHARE_NETWORK_META_LIST = `/rev-share/network/member/list/table-meta/`
//Revshare Date Meta
export const GET_REVSHARE_DATE_META = `/rev-share/date-meta/`
//RevShare Live Network tab list
export const GET_REVSHARE_LIVE_NETWORK_LIST = `/rev-share/newly-added-agent/list/`
//RevShare Live Network tab list
export const GET_REVSHARE_LIVE_NETWORK_META_LIST = `/rev-share/newly-added-agent/list/table-meta/`
export const POST_JOIN_A_TEAM_REQUEST = (id: string) =>
  `/team/${id}/request/create/`
export const AGENT_REQUEST_META = (id: string) =>
  `/team/${id}/request/create/meta/`
export const GET_LANGUAGES_META_API = `/meta/language/list/`
export const GET_AGENT_PROFILE_CARD_DATA = (
  teamId?: string,
  agentId?: string
) => `/team/${teamId}/agent/detail/${agentId}`
export const POST_ICA_ACKNOWLEDGE = `/agent/acknowledge-ica/`

// -----------------------------------------------

// POST_SCHEDULE_TOUR  - removed
// GET_SCHEDULE_META - replaced
// GET_UPCOMING_TOURS - replaced
// PATCH_SCHEDULE_TOUR - replaced
// POST_MAKE_AN_OFFER - removed
// GET_OFFERS_MADE - replace
// POST_CTA_FORM -removed
// GET_SELL_FIELD_DATA - removed
// POST_SELL_PROPERTY -removed
// GET_OPEN_HOUSE_LIST -replaced
// GET_OWNER_HOUSES_LIST -replaced
// FAVORITES_LIST_API-  remove
// CUD_FAV_LIST
// GET_TOURS_SCHEDULED_META_API -removed
// OPEN_HOUSE_ADD_API - replace
// POST_REMOVE_FAV_IN_USERDASH - removed
// GET_SAVED_SEARCH_LIST - replaced

//agent website lead enquiry form api

export const GET_LEAD_FORM_META = `/web/lead/create/meta/`
export const POST_LEAD_FORM = `/agent/user-enquiry/cud/`
export const GET_LEAD_INTEREST_META = `/agent/user-enquiry/cud/meta/`
