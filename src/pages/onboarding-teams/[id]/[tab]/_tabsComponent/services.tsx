// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import moment from "moment";
import toast from "react-hot-toast";
import {
  addSpecialCharsForPhoneNumber,
  getResponse,
  formatDateTime,
  removeSpecialChars,
  upperToLowercaseInString,
} from "../../../../../utils/functions/commonFunctions";

const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const subdomain = hostname.split(".");

const isStaging = subdomain.includes("staging-v2");
const isUat = subdomain.includes("uat");
const isLocalHost = subdomain[subdomain.length - 1].includes("localhost");

const protocol = isLocalHost ? "http:" : "https:";
const environment = isStaging ? "staging-v2." : isUat ? "uat." : "";
const baseHost = isLocalHost
  ? `${subdomain[subdomain.length - 1]}:3000`
  : subdomain[subdomain.length - 2] + "." + subdomain[subdomain.length - 1];

export const getorigin = (app_subdomain: "agent" | "join") =>
  protocol + "//" + environment + app_subdomain + "." + baseHost;

const ensureurl = (input: string) => {
  if (input === "" || input === null) return null;
  const updatedUrl =
    input?.startsWith("http://") || input?.startsWith("https://")
      ? input
      : `https://${input}`;
  return updatedUrl;
};

export const websiteUpdate = (
  data: any,
  mutate: any,
  formData: any,
  isPublish: boolean,
  slug: string,
  slugCheck: boolean
) => {
  const obj = {
    is_publish: isPublish,
    username: slugCheck ? slug : undefined,
    profile_picture: formData?.profile?.[0]?.id,
    agent_detail: {
      certificate: data.data.designation
        ?.slice(0, 20)
        ?.map((each: any) => each?.value),
      agent_since:
        data.data.realtor_since == "" ? null : data.data.realtor_since,
    },
    phone_number: `+1${removeSpecialChars(data.data.phone)}`,
    email: data.data.email,
    facebook: ensureurl(data.data.facebook),
    instagram: ensureurl(data.data.instagram),
    linkedin: ensureurl(data.data.linkedin),
    tik_tok: ensureurl(data.data.tik_tok),
    youtube: ensureurl(data.data.youtube),
    // website_template: 1,
    theme_image: data.data.banner?.id ?? formData?.banner?.id,
    hero_title: data.data.title ?? formData?.hero_content?.identity,
    hero_subtitle: data.data.subtitle ?? formData?.hero_content?.description,
    bio: data.data.bio ?? formData?.about_content?.bio,
    feature_content: {
      feature_title: data.data.service_title ?? formData?.feature_title,
      service_1: {
        icon: data.data.service_icon_1 ?? formData?.service_icon_1,
        title: data.data.service_title_1 ?? formData?.feature_item_1?.identity,
        description:
          data.data.service_description_1 ??
          formData?.feature_item_1?.description,
      },
      service_2: {
        icon: data.data.service_icon_2 ?? formData?.service_icon_2,
        title: data.data.service_title_2 ?? formData?.feature_item_2?.identity,
        description:
          data.data.service_description_2 ??
          formData?.feature_item_2?.description,
      },
      service_3: {
        icon: data.data.service_icon_3 ?? formData?.service_icon_3,
        title: data.data.service_title_3 ?? formData?.feature_item_3?.identity,
        description:
          data.data.service_description_3 ??
          formData?.feature_item_3?.description,
      },
    },
    testimonial: data.data.testimonial,
    roa_email: data.data.roa_email,
    personal_website: ensureurl(data.data.website),
    contact_form_image: formData?.form_image?.[0]?.file,
  };
  //@ts-expect-error ignore
  mutate(obj);
};

export const PrefilledOptionsCMS = (
  agentWebDetailData: any,
  bannerData: any,
  formUtils: any,
  agentDetailData: any,
  formData: any
) => {
  //@ts-expect-error ignore

  const a = {
    data: {
      phone: addSpecialCharsForPhoneNumber(
        agentWebDetailData?.data?.phone_number?.substr(2, 13) ??
          agentWebDetailData?.data?.user?.phone_number?.substr(2, 13)
      ),
      //@ts-expect-error ignore
      profile_picture: agentWebDetailData?.data?.profile_picture ?? undefined,
      facebook: agentWebDetailData?.data?.facebook,
      instagram: agentWebDetailData?.data?.instagram,
      linkedin: agentWebDetailData?.data?.linkedin,
      tik_tok: agentWebDetailData?.data?.tik_tok,
      youtube: agentWebDetailData?.data?.youtube,
      designation: getResponse(
        agentWebDetailData?.data?.agent_detail?.certificate
      ),
      // website_template: 1,
      banner:
        formData?.banner?.file ??
        agentWebDetailData?.data?.theme_image ??
        bannerData?.data?.results?.[0],
      title: agentWebDetailData?.data?.hero_title,
      subtitle: agentWebDetailData?.data?.hero_subtitle,
      bio: upperToLowercaseInString(agentWebDetailData?.data?.bio),
      service_title: agentWebDetailData?.data?.feature_content?.feature_title,
      service_title_1:
        agentWebDetailData?.data?.feature_content?.service_1?.title,
      service_title_2:
        agentWebDetailData?.data?.feature_content?.service_2?.title,
      service_title_3:
        agentWebDetailData?.data?.feature_content?.service_3?.title,
      service_description_1:
        agentWebDetailData?.data?.feature_content?.service_1?.description,
      service_description_2:
        agentWebDetailData?.data?.feature_content?.service_2?.description,
      service_description_3:
        agentWebDetailData?.data?.feature_content?.service_3?.description,
      service_icon_1:
        agentWebDetailData?.data?.feature_content?.service_1?.icon,
      service_icon_2:
        agentWebDetailData?.data?.feature_content?.service_2?.icon,
      service_icon_3:
        agentWebDetailData?.data?.feature_content?.service_3?.icon,
      realtor_since: agentWebDetailData?.data?.agent_detail?.agent_since,
      testimonial: agentWebDetailData?.data?.testimonial,
      // roa_email: agentWebDetailData?.data?.agent_detail.roa_email,
      email:
        agentWebDetailData?.data?.email ??
        agentWebDetailData?.data?.user?.email,
      website: agentWebDetailData?.data?.personal_website,
      last_updated: moment(agentWebDetailData?.data?.modified).fromNow(),
      created: agentWebDetailData?.data?.is_publish
        ? formatDateTime(agentWebDetailData?.data?.published_at)
        : "-",
      license:
        agentDetailData?.data?.agent?.primary_license_no ??
        agentWebDetailData?.data?.primary_license,
      website_link:
        getorigin("agent") + `/website/${agentWebDetailData?.data?.username}`,
      form_image: agentWebDetailData?.data?.contact_form_image ?? undefined,
      roa_email: agentWebDetailData?.data?.agent_detail?.roa_email,
    },
  };
  formUtils.reset(a);
};

export const copyUrl = (url: string) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Error copying link: ", err);
    });
};

export const commonFieldsValueFromProfile = (
  mutate: any,
  fieldKey: any,
  field: any,
  form: any,
  fieldKey2?: any,
  field2?: any,
  formData?: any,
  fieldKey3?: any,
  field3?: any,
  fieldKey4?: any,
  field4?: any
) => {
  const obj = {
    [fieldKey]: field,
    [fieldKey2]: field2,
    [fieldKey3]: field3,
    [fieldKey4]: field4,
    user: {
      //@ts-expect-error ignore
      profile_picture: formData?.profile?.[0]?.id,
    },
    phone_number: `+1${removeSpecialChars(form.watch("data.phone"))}`,
    email: form.watch("data.email"),
    agent_detail: {
      certificate: form
        .watch("data.designation")
        ?.slice(0, 20)
        ?.map((each: any) => each?.value),
      agent_since:
        form.watch("data.realtor_since") === ""
          ? null
          : form.watch("data.realtor_since"),
    },
    facebook: ensureurl(form.watch("data.facebook")),
    instagram: ensureurl(form.watch("data.instagram")),
    linkedin: ensureurl(form.watch("data.linkedin")),
    tik_tok: ensureurl(form.watch("data.tik_tok")),
    youtube: ensureurl(form.watch("data.youtube")),
    theme_image: formData?.banner?.id,
  };
  mutate(obj);
};
