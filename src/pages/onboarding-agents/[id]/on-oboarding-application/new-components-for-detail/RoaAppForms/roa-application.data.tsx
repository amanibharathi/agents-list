/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Box, Flex, Text } from "@chakra-ui/react";
import {
  licenseDetailsOptions,
  yourEmergencyContactOptions,
} from "./roa-application.options.data";
// import { teamList } from "../components/dummyData";
// import { FieldValues, UseFormReturn } from "react-hook-form";
// import tick from "../../../assets/Images/Icons/tick.svg";
// import xmark from "../../../assets/Images/Icons/x-close.svg";

import { IMultipartInputList } from "../AppForm/types/types";
import { getTodayDate } from "../../../../../../utils/functions/commonFunctions";
// import { getUserData } from "../../../../../../utils/functions/tokenAndUserData";

export const tellAboutYourSelfInputs = (): IMultipartInputList[] => {
  // const userData = getUserData();

  return [
    {
      title: "Personal Information",
      reviewTitle: "Personal Information",
      route: "/roa-application/about-yourself",
      desc: "Please enter your personal contact detailps. If you need to update any entries, you may do so now.",
      inputs: [
        {
          thisWrapperClassName: "",
          render: [
            {
              type: "text",
              name: "preferred_name",
              label: "Preferred First Name",
              placeholder: "Enter your preferred first name",
              inputOptions: {
                formControlStyles: {
                  width: "100%",
                  maxWidth: "320px",
                },
              },
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
          },
          render: [
            {
              type: "text",
              name: "first_name",
              label: "First Name",
              placeholder: "Enter your first name",
            },
            {
              type: "text",
              name: "last_name",
              label: "Last Name",
              placeholder: "Enter your last name",
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
          },
          render: [
            {
              type: "tel",
              name: "phone_number",
              label: "Phone Number",
              placeholder: "(###) ###-####",
            },
            {
              type: "date",
              name: "dob",
              label: "Birthdate",
              placeholder: "MM/DD/YYYY",
            },
          ],
        },
      ],
    },
  ];
};

export const yourResidentialDetailsInputs = ({
  metaData,
  handleOnInputChange,
  metaDataIsLoading,
}: {
  metaData: unknown;
  handleOnInputChange: (val: string) => void;
  metaDataIsLoading: boolean;
}): IMultipartInputList[] => {
  return [
    {
      title: "Your Residential Details",
      desc: "Provide accurate information for communication and verification purposes.",
      reviewTitle: "Residential Details",
      route: "/roa-application/your-residential-address",
      inputs: [
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "text",
              name: "address_line_1",
              label: "Mailing Address",
              placeholder: "Address Line 1",
            },
          ],
        },
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "text",
              name: "address_line_2",
              placeholder: "Address Line 2",
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
          },
          render: [
            {
              type: "text",
              name: "city",
              label: "City",
              placeholder: "City",
            },
            {
              type: "select",
              name: "state",
              label: "State",
              placeholder: "State",
              //@ts-expect-error ignore
              options: metaData?.data?.results,
              inputOptions: {
                isLoading: metaDataIsLoading,
                onInputChange: handleOnInputChange,
              },
              // options: metaOption
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "50%" },
          },
          render: [
            {
              type: "text",
              name: "zipcode",
              label: "Zip Code",
              placeholder: "Zip Code",
            },
          ],
        },
      ],
    },
  ];
};

export const yourEmergencyDetailsInputs = (): IMultipartInputList[] => {
  return [
    {
      title: "Your Emergency Contact",
      desc: "Provide contact details for someone we can notify in case of an emergency.",
      reviewTitle: "Emergency contact Details",
      route: "/roa-application/your-emergency-contact",
      inputs: [
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "text",
              name: "ec_name",
              label: "Emergency Contact Name",
              placeholder: "Full Name",
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
          },
          render: [
            {
              type: "tel",
              name: "ec_phone_number",
              label: "Phone Number",
              placeholder: "Phone Number",
            },
            {
              type: "select",
              name: "ec_relationship",
              label: "Relationship",
              placeholder: "relationship",
              options: yourEmergencyContactOptions?.relationship,
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "50%" },
          },
          render: [
            {
              type: "text",
              name: "ec_email",
              label: "Email",
              placeholder: "Email",
              otherRegProps: {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              },
            },
          ],
        },
      ],
    },
  ];
};

export const licenseDetailsInputs = ({
  metaData,
  handleOnInputChange,
  metaDataIsLoading,
}: {
  metaData: unknown;
  handleOnInputChange: (val: string) => void;
  metaDataIsLoading: boolean;
}): IMultipartInputList[] => {
  return [
    {
      title: "Your Real Estate License Details",
      desc: "Provide your license information for each state you hold a license.",
      reviewTitle: "Your Real Estate License Details",
      route: "/roa-application/licensed-details",
      inputs: [
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "select",
              name: "licenses.0.state",
              label: "Primary State",
              placeholder: "Select One",
              //@ts-expect-error ignore
              options: metaData?.data?.results,
              inputOptions: {
                isLoading: metaDataIsLoading,
                onInputChange: handleOnInputChange,
              },
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
          },
          render: [
            {
              type: "select",
              name: "licenses.0.license_type",
              label: "What type of license is it?",
              placeholder: "Select One",
              options: licenseDetailsOptions?.licenseType,
            },
            {
              type: "text",
              name: "licenses.0.license_no",
              label: "License Number",
              placeholder: "License Number",
              // options: metaOption
            },
          ],
        },
        {
          thisWrapperStyles: {
            gap: "15px",
            gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
          },
          render: [
            {
              type: "date",
              name: "licenses.0.expiry_date",
              label: "Expiration Date",
              placeholder: "mm/dd/yyyy",
              inputOptions: {
                min: getTodayDate(),
              },
              otherRegProps: {
                validate: (value) =>
                  new Date(value).getTime() >=
                    new Date().setHours(0, 0, 0, 0) ||
                  "Date must be today or later",
              },
            },
            {
              type: "date",
              name: "licenses.0.planned_transfer_date",
              label: "When do you plan to transfer this license?",
              placeholder: "mm/dd/yyyy",
              inputOptions: {
                min: getTodayDate(),
              },
            },
          ],
        },
      ],
    },
  ];
};

export const areYouLicensedInMulitpleStates = (): IMultipartInputList[] => {
  return [
    {
      title: "Are you licensed in multiple states?",
      desc: "Let us know if you hold active real estate licenses in more than one state. This helps us streamline your onboarding process and ensure all your licenses are properly tracked.",
      reviewTitle: "Are you licensed in multiple states?",
      route: "/roa-application/licensed-in-multiple-states",
      inputs: [
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "radio",
              name: "multiple_license_enabled",
              options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ],
            },
          ],
        },
      ],
    },
  ];
};

export const hasDisciplinaryActionsTaken = ({
  hasLicenseSuspended,
}: {
  hasLicenseSuspended?: string;
}): IMultipartInputList[] => {
  return [
    {
      title:
        "Have you ever been subject to a formal complaint or disciplinary action related to your real estate license?",
      desc: "This includes any formal complaints, fines, or disciplinary actions filed against you with a real estate board or regulatory agency.",
      reviewTitle:
        "Have you ever been subject to a formal complaint or disciplinary action related to your real estate license?",
      route: "/roa-application/real-estate-boards",
      inputs: [
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "radio",
              name: "is_license_has_complaint",
              options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Has your real estate license ever been suspended?",
      titleStyles: {
        fontSize: "20px",
      },
      desc: "If your real estate license has ever been temporarily suspended by a real estate commission or regulatory authority, please let us know.",
      //@ts-expect-error ignore
      inputs: [
        {
          thisWrapperStyles: {},
          render: [
            {
              type: "radio",
              name: "is_license_suspended",
              options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ],
            },
          ],
        },
        hasLicenseSuspended == "true" && {
          thisWrapperStyles: {},
          render: [
            {
              label: "Details on Your License Suspension",
              type: "textarea",
              name: "suspension_detail",
              bottomDesc:
                "Briefly describe the circumstances involving your license suspsension.",
              placeholder: "Enter suspension details..",
            },
          ],
        },
      ]?.filter(Boolean),
    },
  ];
};

// export const yourProffExpDetailsInputs = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "Your Professional Experience",
//       desc: "Help us understand your professional background and recent production history.",
//       reviewTitle: "Your Professional Experience",
//       route: "/roa-application/professional-experience",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "text",
//               name: "nrds_id",
//               label: "What is your NRDS ID?",
//               placeholder: "Enter NRDS ID",
//               required: false,
//               otherRegProps: {
//                 maxLength: {
//                   value: 9,
//                   message: "NRDS ID must be 9 digits long",
//                 },
//                 minLength: {
//                   value: 9,
//                   message: "NRDS ID must be 9 digits long",
//                 },
//               },
//             },
//           ],
//         },
//         {
//           thisWrapperClassName: "",
//           render: [
//             {
//               type: "select",
//               name: "last_12_month_closed_transaction",
//               label:
//                 "How many transactions have you closed over the last 12 months?",
//               placeholder: "Enter Transactions",
//               options: yourProffExpDetailsOptions?.transactions,
//             },
//           ],
//         },
//         {
//           thisWrapperClassName: "",
//           render: [
//             {
//               type: "select",
//               name: "last_12_month_volume",
//               label: "What is your production volume for the last 12 months?",
//               placeholder: "Enter Production Volume",
//               options: yourProffExpDetailsOptions?.productionVolume,
//             },
//           ],
//         },
//         {
//           thisWrapperClassName: "",
//           render: [
//             {
//               type: "text",
//               name: "affiliated_brokerage",
//               label: "Which brokerage are you currently affiliated with?",
//               placeholder: "Enter Brokerage Affiliation",
//               required: false,
//             },
//           ],
//         },
//         {
//           thisWrapperClassName: "",
//           render: [
//             {
//               type: "multi-select",
//               name: "closed_transaction_type",
//               label: "What type of transactions have you successfully closed?",
//               placeholder: "Select Transactions Type",
//               options: yourProffExpDetailsOptions?.transactionTypes,
//               required: false,
//             },
//           ],
//         },
//         {
//           thisWrapperClassName: "",
//           render: [
//             {
//               type: "multi-select",
//               name: "provided_service",
//               label: "Select any additional professional services you provide",
//               placeholder: "Select Additional Services",
//               options: yourProffExpDetailsOptions?.additionalServices,
//             },
//           ],
//         },
//         {
//           thisWrapperClassName: "",
//           render: [
//             {
//               type: "select",
//               name: "is_transactions_pending",
//               label:
//                 "Do you have any pending transactions you will be closing after you transfer your license?",
//               placeholder: "Select",
//               options: yourProffExpDetailsOptions?.propertiesUnderContract,
//               required: false,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const whoIsYourSponsoringAgent = ({
//   formUtils,
//   metaData,
//   metaDataIsLoading,
//   handleOnInputChange,
// }: {
//   metaData?: unknown;
//   handleOnInputChange?: (val: string) => void;
//   metaDataIsLoading?: boolean;
//   formUtils: UseFormReturn<FieldValues, unknown, undefined>;
// }): IMultipartInputList[] => {
//   const onOpenUnlistedSponsor = () => {
//     formUtils.setValue("__isUnlistedSponsorOpened__", true);
//   };
//   const isUnlistedAgentProvided = !!formUtils?.watch("sponsor_data.first_name");
//   const isNoSponsorSelected = !!formUtils?.watch("__isNoSponsorSelected__");
//   const handleClearNoSponsor = () => {
//     formUtils?.setValue("__isNoSponsorSelected__", false);
//   };

//   return [
//     {
//       title: "Who is your sponsoring agent?",
//       desc: "If a Realty of America agent referred you, please provide their name here. If you are part of a team, your official sponsor may determined by your team structure.",
//       reviewTitle: "Who is your sponsoring agent?",
//       route: "/roa-application/sponsoring-agent",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: isNoSponsorSelected ? "custom-comp" : "custom-select",
//               name: isUnlistedAgentProvided
//                 ? "sponsor_data"
//                 : "sponsor_data.sponsor",
//               placeholder: "Search by Name, Email, or License",
//               //@ts-expect-error ignore
//               options: metaData?.data?.results?.map((m) => ({
//                 ...m,
//                 label: `${m?.full_name}`,
//                 value: m?.id,
//               })),
//               comp: <NoSponsorCard onChange={() => handleClearNoSponsor()} />,
//               required: false,
//               // options: sponserList,
//               inputOptions: {
//                 onInputChange: handleOnInputChange,
//                 isLoading: metaDataIsLoading,
//                 customBottomContent: (
//                   <Flex justifyContent="space-between" mt="5px">
//                     <Text
//                       sx={{
//                         color: "#414651",
//                         fontSize: "14px",
//                         lineHeight: "20px",
//                         fontWeight: 500,
//                       }}
//                     >
//                       If you are not naming a sponsor, leave blank.
//                     </Text>
//                     <AppButton
//                       onClick={() => onOpenUnlistedSponsor()}
//                       variant={"plainText"}
//                       sx={{
//                         color: "#10295A",
//                         fontSize: "14px",
//                         lineHeight: "20px",
//                         textDecoration: "underline",
//                         fontWeight: 500,
//                       }}
//                     >
//                       Can’t Find Your Sponsor?
//                     </AppButton>
//                   </Flex>
//                 ),
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const areYouPartOfTeam = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "Are you a part of a team?",
//       desc: "Let us know if you are joining ROA as part of a team.",
//       reviewTitle: "Are you a part of a Team?",
//       route: "/roa-application/part-of-team",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "radio",
//               name: "is_part_of_team",
//               inputOptions: {
//                 formControlClassName: "part-of-team",
//                 radioOptionsWrapperStyles: {
//                   flexFlow: "column",
//                   gap: "18px !important",
//                   alignItems: "start",
//                   mt: "10px",
//                 },
//               },
//               options: [
//                 {
//                   label: "Yes",
//                   value: "true",
//                 },
//                 {
//                   label: "No",
//                   value: "false",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const wouldYouLikeToJoinATeam = (
//   formUtils: any
// ): IMultipartInputList[] => {
//   const team_member = formUtils.watch("team_member");
//   return [
//     {
//       title: "How would you like to join a team?",
//       desc: "Let us know if you are joining ROA as part of a team.",
//       reviewTitle: "How would you like to join a team?",
//       route: "/roa-application/join-a-team",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "radio",
//               name: "join_a_team",
//               inputOptions: {
//                 formControlClassName: "part-of-team",
//                 radioOptionsWrapperStyles: {
//                   flexFlow: "column",
//                   gap: "25px",
//                 },
//               },
//               options: [
//                 {
//                   label: "Register my Team",
//                   value: "true",
//                   desc: (
//                     <Box sx={{ color: "#10295A", fontSize: "14px" }} as="span">
//                       <Box sx={{ color: "#10295A", fontWeight: 700 }} as="span">
//                         Are you a team leader or team admin?
//                       </Box>{" "}
//                       Submit your team’s information to officially register with
//                       ROA. Once registered, you’ll gain access to essential
//                       tools to manage members, track team performance, and
//                       foster growth within your team.
//                     </Box>
//                   ),
//                 },
//                 {
//                   label:
//                     team_member === "team_not_found"
//                       ? "Team Not Found"
//                       : "Join a Team",
//                   value: "false",
//                   desc: (
//                     <Box sx={{ color: "#10295A", fontSize: "14px" }} as="span">
//                       <Box sx={{ color: "#10295A", fontWeight: 700 }} as="span">
//                         Already part of a team?
//                       </Box>{" "}
//                       Find your team by searching for its name and ID and submit
//                       a request to join. Once your request is approved by the
//                       team leader, you’ll gain access to your team’s dashboard
//                       and tools.
//                     </Box>
//                   ),
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const letsFindYourTeamInputs = (
//   TeamList: any,
//   onOpen: any
// ): IMultipartInputList[] => {
//   return [
//     {
//       title: "Let’s Find Your Team",
//       desc: "Locate your team by searching by team name, team lead, email, or license number. If you’re unsure, check with your team or click below for assistance.",
//       reviewTitle: "Let’s find your Team",
//       route: "/roa-application/find-your-team",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "custom-select",
//               name: "team_member",
//               placeholder:
//                 "Search by Team Name or Team Lead (Name, Email, or License)",
//               options: TeamList,
//               inputOptions: {
//                 customBottomContent: (
//                   <Flex justifyContent="flex-end" mt="5px">
//                     <Text
//                       sx={{
//                         color: "#10295A",
//                         fontSize: "14px",
//                         lineHeight: "20px",
//                         textDecoration: "underline",
//                         fontWeight: 500,
//                         cursor: "pointer",
//                       }}
//                       onClick={onOpen}
//                     >
//                       I Can’t Find My Team
//                     </Text>
//                   </Flex>
//                 ),
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const tellAbtYourTeam = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "Tell Us About Your Team",
//       desc: "Help us get your team set up by providing the details below. If any information changes, you can update it later.",
//       reviewTitle: "Tell Us About Your Team",
//       route: "/roa-application/about-your-team",
//       inputs: [
//         {
//           thisWrapperStyles: {
//             gap: "15px",
//             gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
//           },
//           render: [
//             {
//               type: "select",
//               name: "team_structure",
//               label: "Team Structure",
//               placeholder: "Select",
//               options: dummyOptions,
//             },
//             {
//               type: "text",
//               name: "number_of_agents",
//               label: "Number of Agents",
//               placeholder: "Enter Number of Agents",
//             },
//             {
//               type: "select",
//               name: "team_volume_last_12_months",
//               label: "Team Volume Last 12 Months",
//               placeholder: "Select",
//               options: dummyOptions,
//             },
//             {
//               type: "select",
//               name: "team_transactions_last_12_months",
//               label: "Team Transactions Last 12 Months",
//               placeholder: "Select",
//               options: dummyOptions,
//             },
//             {
//               type: "text",
//               name: "team_contact_email",
//               label: "Team Contact Email",
//               placeholder: "Enter Email",
//               required: false,
//               otherRegProps: {
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Invalid email address",
//                 },
//               },
//             },
//             {
//               type: "text",
//               name: "team_website",
//               label: "Team Website",
//               placeholder: "https://",
//               required: false,
//             },
//             {
//               type: "text",
//               name: "team_phone_number",
//               label: "Team Phone Number",
//               placeholder: "(000) 000-0000",
//               required: false,
//             },
//             {
//               type: "select",
//               name: "primary_state",
//               label: "Primary State",
//               placeholder: "Select",
//               options: dummyOptions,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const tellAbtYourTeamTwoInputs = (
//   formUtils: UseFormReturn<FieldValues, unknown, undefined>,
//   fileMutate: UseMutateFunction<any, Error, FormData, unknown>,
//   metaDataState: unknown,
//   handleOnInputChangeState: (val: string) => void,
//   metaDataIsLoadingState: boolean,
//   metaDataMLS: unknown,
//   handleOnInputChangeMLS: (val: string) => void,
//   metaDataIsLoadingMLS: boolean
// ): IMultipartInputList[] => {
//   const setStateFilter = (val: string) => formUtils.setValue("__state__", val);
//   const m = formUtils.getValues("licenses")?.[0];
//   return [
//     {
//       title: "Tell Us About Your Team",
//       desc: "Help us get your team set up by providing the details below. If any information changes, you can update it later.",
//       reviewTitle: "Personal Information",
//       route: "/roa-application/about-yourself",
//       inputs: [
//         {
//           render: [
//             {
//               type: "text",
//               name: "team.team_name",
//               label: "Team Name",
//               placeholder: "Enter Team Name",
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {
//             gap: "15px",
//             gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
//           },
//           render: [
//             // {
//             //   type: "select",
//             //   name: "team_structure",
//             //   label: "Team Structure ",
//             //   placeholder: "Select",
//             // },
//             {
//               type: "text",
//               name: "team.number_of_agents",
//               label: "Number of Agents ",
//               placeholder: "Enter Number of Agents",
//             },
//             {
//               type: "select",
//               name: "team.team_volume_last_12_months",
//               label: "Team Volume Last 12 Months ",
//               placeholder: "Select",
//               options: yourProffExpDetailsOptions?.productionVolume,
//             },
//             {
//               type: "select",
//               name: "team.team_transactions_last_12_months",
//               label: "Team Transactions Last 12 Months ",
//               placeholder: "Select",
//               options: yourProffExpDetailsOptions?.transactions,
//             },
//             {
//               type: "text",
//               name: "team.team_contact_email",
//               label: "Team Contact Email",
//               placeholder: "Enter Email",
//               otherRegProps: {
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Invalid email address",
//                 },
//               },
//             },
//             {
//               type: "text",
//               name: "team.team_website",
//               label: "Team Website",
//               placeholder: "https://",
//             },
//             {
//               type: "tel",
//               name: "team.team_phone_number",
//               label: "Team Phone Number",
//               placeholder: "(000) 000-0000",
//             },
//             {
//               type: "select",
//               name: "team.primary_state",
//               label: "Primary State ",
//               placeholder: "Select",
//               //@ts-expect-error ignore
//               options: metaDataState?.data?.results,
//               inputOptions: {
//                 isLoading: metaDataIsLoadingState,
//                 onInputChange: handleOnInputChangeState,
//               },
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {
//             gap: "15px",
//           },
//           render: [
//             {
//               type: "multi-select",
//               name: "team.real_estate_boards",
//               label: "Real Estate Board(s)",
//               placeholder: "Enter Brokerage Affiliation",
//               //@ts-expect-error ignore
//               options: metaDataMLS?.data?.results,
//               inputOptions: {
//                 isCreatable: true,
//                 isLoading: metaDataIsLoadingMLS,
//                 onInputChange: handleOnInputChangeMLS,
//                 //@ts-expect-error ignore
//                 onMenuOpen: () =>
//                   setStateFilter(m?.state?.id || m?.state?.value),
//               },
//             },
//             {
//               type: "multi-select",
//               name: "team.mls_membership",
//               label: "MLS Membership(s)",
//               placeholder: "Enter Brokerage Affiliation",
//               //@ts-expect-error ignore
//               options: metaDataMLS?.data?.results,
//               inputOptions: {
//                 isCreatable: true,
//                 isLoading: metaDataIsLoadingMLS,
//                 onInputChange: handleOnInputChangeMLS,
//                 //@ts-expect-error ignore
//                 onMenuOpen: () =>
//                   setStateFilter(m?.state?.id || m?.state?.value),
//               },
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Are you a Team Leader or a Team Admin? *",
//       inputs: [
//         {
//           render: [
//             {
//               type: "radio",
//               name: "team.team_role",
//               // label: "Are you a Team Leader or a Team Admin? ",
//               options: [
//                 { label: "Team Leader", value: "leader" },
//                 { label: "Team Admin", value: "admin" },
//               ],
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {
//             gap: "15px",
//             gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
//             marginTop: "20px",
//           },
//           render: [
//             {
//               type: "text",
//               name: "team.team_lead.first_name",
//               label: "First Name",
//               placeholder: "Enter First Name",
//             },
//             {
//               type: "text",
//               name: "team.team_lead.last_name",
//               label: "Last Name",
//               placeholder: "Enter First Name",
//             },
//             {
//               type: "text",
//               name: "team.team_lead.email",
//               label: "Team Lead Email ",
//               placeholder: "Enter Email",
//               otherRegProps: {
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Invalid email address",
//                 },
//               },
//             },
//             {
//               type: "tel",
//               name: "team.team_lead.phone_number",
//               label: "Team Lead Phone Number ",
//               placeholder: "(000) 000-0000",
//             },
//             {
//               type: "text",
//               name: "team.team_lead.license_no",
//               label: "Team Lead License # ",
//               placeholder: "######",
//             },
//             {
//               type: "select",
//               name: "team.team_lead.state",
//               label: "Team Lead Primary State ",
//               placeholder: "Select",
//               //@ts-expect-error ignore
//               options: metaDataState?.data?.results,
//               inputOptions: {
//                 isLoading: metaDataIsLoadingState,
//                 onInputChange: handleOnInputChangeState,
//               },
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Upload Documents",
//       desc: "Upload any necessary documents related to your team’s registration, team commission structures, or other team onboarding requirements.",
//       inputs: [
//         {
//           render: [
//             {
//               type: "file",
//               name: "team.team_document",
//               required: false,
//               imageState: formUtils?.watch("team.team_document"),
//               setImageState: (val: any) =>
//                 formUtils?.setValue("team.team_document", val, {
//                   shouldValidate: true,
//                   shouldDirty: true,
//                 }),
//               inputOptions: {
//                 endPoint: POST_FILE_UPLOAD,
//                 isMultiple: true,
//                 //@ts-expect-error ignore
//                 handleUpload: async (
//                   files: any,
//                   setUploadProgress: React.Dispatch<
//                     React.SetStateAction<number>
//                   >
//                 ) => {
//                   const formData = new FormData();
//                   Array.from(files).forEach((file) => {
//                     //@ts-expect-error ignore
//                     formData.append("files", file);
//                   });
//                   console.log(files);
//                   const data = await fileMutate({
//                     //@ts-expect-error ignore
//                     files: formData,
//                     setUploadProgress,
//                   });
//                   //@ts-expect-error ignore
//                   formUtils.setValue("team.team_document", data?.data);
//                   console.log(data);
//                   return data;
//                 },
//               },
//               // inputOptions: {
//               //   onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
//               //     console.log("working");
//               //     const files = e.target.files;
//               //     if (files && files.length > 0) {
//               //       Array.from(files).forEach((file) => {
//               //         formData.append("files", file);
//               //       });
//               //       fileMutate(formData);
//               //     }
//               //   },
//               // },
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const uploadSupportingDocInputs = ({
//   formUtils,
// }: {
//   formUtils: UseFormReturn<FieldValues, unknown, undefined>;
// }): IMultipartInputList[] => {
//   return [
//     {
//       title: "Upload Supporting Documents",
//       desc: "Upload any necessary documents related to your team’s registration, commission structures, or other onboarding requirements.",
//       reviewTitle: "Upload Supporting Documents",
//       route: "/roa-application/team-supporting-docs",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "file",
//               name: "supporting_document",
//               imageState: formUtils?.watch("supporting_document"),
//               setImageState: (val: any) =>
//                 formUtils?.setValue("supporting_document", val, {
//                   shouldValidate: true,
//                   shouldDirty: true,
//                 }),
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const licenseBoardAndMlsDetails = ({
//   formUtils,
//   metaData,
//   handleOnInputChange,
//   metaDataIsLoading,
// }: {
//   metaData: unknown;
//   handleOnInputChange: (val: string) => void;
//   metaDataIsLoading: boolean;
//   formUtils: UseFormReturn<FieldValues, unknown, undefined>;
// }): IMultipartInputList[][] => {
//   const setStateFilter = (val: string) => formUtils.setValue("__state__", val);
//   const licenseList = formUtils?.getValues("licenses");
//   return licenseList?.map(
//     (m: { label: string; value: string }, ind: number) => [
//       {
//         title: (
//           <Box
//             as="span"
//             sx={{ fontSize: { base: "17px", md: "20px" } }}
//           >{`Which Real Estate Board(s) are you a member of in ${
//             //@ts-expect-error ignore
//             m?.state?.label || m?.state?.identity
//           }?`}</Box>
//         ),
//         desc: `Enter the real estate board(s) or association(s) you are affiliated with in ${m?.label}.`,
//         inputs: [
//           {
//             thisWrapperStyles: {},
//             render: [
//               {
//                 type: "multi-select",
//                 name: `licenses.${ind}.boards`,
//                 label: "Real Estate Boards / Associations",
//                 placeholder: "Select",
//                 //@ts-expect-error ignore
//                 options: metaData?.data?.results,
//                 inputOptions: {
//                   isCreatable: true,
//                   isLoading: metaDataIsLoading,
//                   onInputChange: handleOnInputChange,
//                   onMenuOpen: () =>
//                     //@ts-expect-error ignore
//                     setStateFilter(m?.state?.id || m?.state?.value),
//                 },
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: (
//           <Box
//             as="span"
//             sx={{ fontSize: { base: "17px", md: "20px" } }}
//           >{`Which MLS(s) are you a member of or are planning to join?`}</Box>
//         ),
//         desc: `List the MLS(s) you currently have access to.`,
//         inputs: [
//           {
//             thisWrapperStyles: {},
//             render: [
//               {
//                 type: "multi-select",
//                 name: `licenses.${ind}.mls`,
//                 label: "Multiple Listing Service (MLS)",
//                 placeholder: "Select",
//                 //@ts-expect-error ignore
//                 options: metaData?.data?.results,
//                 inputOptions: {
//                   isCreatable: true,
//                   isLoading: metaDataIsLoading,
//                   onInputChange: handleOnInputChange,
//                   onMenuOpen: () =>
//                     //@ts-expect-error ignore
//                     setStateFilter(m?.state?.id || m?.state?.value),
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ]
//   );
// };

// // tax information

// export const _TaxInformation = (): IMultipartInputList[] => {
//   const title = "Why do we need this?";
//   const tax_info_list = [
//     "The IRS mandates that independent contractors earning $600+ per year submit a W-9 form for tax reporting.",
//     "Providing your tax info now prevents delays in receiving future payments.",
//     "You’ll need to enter either your Social Security Number (SSN) or Employer Identification Number (EIN)",
//   ];
//   const guarantee_msg =
//     "This form is designed with your security in mind. All tax information is encrypted and stored securely to ensure confidentiality.";
//   return [
//     {
//       title: "Tax Information Details",
//       desc: "To comply with IRS regulations, Realty of America requires a W-9 tax form from all agents receiving payouts in the U.S. This ensures accurate tax reporting and prevents delays.",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "custom-comp",
//               name: "tax_Information_list",
//               required: false,
//               comp: (
//                 <TaxInforamtionList
//                   title={title}
//                   tax_info_list={tax_info_list}
//                   guarantee_msg={guarantee_msg}
//                 />
//               ),
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const _paymentFromROA = ({
//   formUtils,
//   metaData,
//   handleOnInputChange,
//   metaDataIsLoading,
// }: {
//   formUtils: UseFormReturn<any>;
//   metaData: unknown;
//   handleOnInputChange: (val: string) => void;
//   metaDataIsLoading: boolean;
// }): IMultipartInputList[] => {
//   return [
//     {
//       title: "Substitute w-9 Form",
//       route: "/roa-application/form/tax-information/step-2",
//       inputs: [
//         {
//           thisWrapperStyles: {
//             gap: "20px",
//           },
//           render: [
//             {
//               type: "radio",
//               name: "tax_information.filer_classification",
//               label: "How Will You Receive Payment from Reality of America",
//               labelStyles: { fontSize: "20px", paddingBottom: "20px" },
//               options: [
//                 { label: "As an Individual", value: "individual" },
//                 { label: "As an Entity", value: "entity" },
//               ],
//               inputOptions: {
//                 onChange: () => {
//                   const tax_payer_identification_type =
//                     formUtils.getValues(
//                       "tax_information.filer_classification"
//                     ) == "individual"
//                       ? "SSN"
//                       : "EIN";
//                   formUtils.setValue(
//                     "tax_information.tax_payer_identification_type",
//                     tax_payer_identification_type
//                   );

//                   formUtils.setValue("tax_information.taxpayer_id", "");
//                   formUtils.setValue("tax_information.taxpayer_id_display", "");
//                 },
//               },
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {
//             gap: "20px",
//           },
//           render: [
//             {
//               type: "text",
//               name: "tax_information.identity",
//               label: "TaxPayer or Buisness Name",
//               placeholder: "Enter Taxpayer or Buisness Name",
//               bottomDesc:
//                 "Enter Your Full Name as shown on your income tax return.",
//             },
//             {
//               type: "text",
//               name: "tax_information.disregarded_entity_name",
//               label: "Disregarted Entity Name",
//               placeholder: "Enter Disregarded Entity Name",
//               bottomDesc: "If differenent from full name",
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {
//             gridTemplateColumns: { base: "auto", md: "4fr 1fr" },
//             alignItems: "center",
//             gap: "20px",
//           },
//           render: [
//             {
//               type: "text",
//               name: "tax_information.taxpayer_id",
//               label: "U.S. Tax Payer Identification Number (TIN)",
//               placeholder: `${
//                 formUtils.getValues(
//                   "tax_information.tax_payer_identification_type"
//                 ) == "SSN"
//                   ? "###-##-####"
//                   : "##-#######"
//               }`,
//               bottomDesc: "Number and type must correspond with name provided",
//               otherRegProps: {
//                 onChange: () => {},
//               },
//               inputOptions: {
//                 onInput: (e) => {
//                   handleTaxInputChange(e, formUtils);
//                 },
//                 onKeyDownCapture: (e) => {
//                   if (e.key == "Backspace" || e.key == "Delete") {
//                     handleTaxInputDelete(e, formUtils);
//                   }
//                 },
//                 fontFamily: "mono",
//               },
//             },
//             {
//               type: "radio",
//               name: "tax_information.tax_payer_identification_type",
//               labelStyles: { pointerEvents: "none" },
//               inputOptions: {
//                 isReadOnly: true,
//               },
//               options: [
//                 { label: "SSN", value: "SSN" },
//                 { label: "EIN", value: "EIN" },
//               ],
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: { gap: "20px" },
//           render: [
//             {
//               type: "select",
//               name: "tax_information.tax_classification",
//               label: "Tax Classification",
//               placeholder: "Select Tax Classification",
//               options: [
//                 {
//                   label: "Individual LLC",
//                   value: "individual_llc",
//                 },
//               ],
//             },
//             {
//               type: "text",
//               name: "tax_information.address_line_1",
//               label: "Maillling Address",
//               placeholder: "Address Line 1",
//             },
//             {
//               type: "text",
//               name: "tax_information.address_line_2",
//               placeholder: "Address Line 2",
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {
//             gridTemplateColumns: { base: "auto", md: "1fr 1fr" },
//             gap: "20px",
//           },
//           render: [
//             {
//               type: "text",
//               name: "tax_information.city",
//               label: "City",
//               placeholder: "City",
//             },
//             {
//               type: "select",
//               name: "tax_information.state",
//               label: "State",
//               placeholder: "State",
//               //@ts-expect-error ignore
//               options: metaData?.data?.results,
//               inputOptions: {
//                 isLoading: metaDataIsLoading,
//                 onInputChange: handleOnInputChange,
//               },
//               // options: metaOption
//             },
//           ],
//         },
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "text",
//               name: "tax_information.zipcode",
//               label: "Zip Code",
//               placeholder: "Zip Code",
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const _TaxInformationSuccess = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "You’ve Submitted Your Tax Information!",
//       desc: "Your tax information has been successfully submitted. Next, review and sign your Independent Contractor Agreement (ICA).",
//       inputs: [
//         {
//           render: [
//             {
//               type: "custom-comp",
//               name: "tax-information-success",
//               required: false,
//               comp: <TaxSuccessPage />,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// // SIgnICa
// export const _signICA = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "Independent Contractor Agreement",
//       desc: "To finalize your onboarding with Realty of America, you must review and electronically sign your Independent Contractor Agreement (ICA). ",
//       route: "/sign-your-ica/step-1",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "custom-comp",
//               name: "signica",
//               required: false,
//               comp: <Contract />,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const _ICASuccessPage = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "You’ve Signed your ICA!",
//       desc: "Your Independent Contractor Agreement (ICA) has been successfully signed and submitted. Now, let’s set up your essential agent tools to get started",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "custom-comp",
//               name: "icasuccess",
//               required: false,
//               comp: <SignICACustomSuccessPage />,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// // agent tools
// export const _agentTools = (
//   formUtils: UseFormReturn<IMultipartFormData>,
//   AgentToolsData: any[],
//   isAgentToolsSuccess: boolean
// ): IMultipartInputList[] => {
//   return [
//     {
//       title: "Agent Tools To Level Up Your Business",
//       desc: "Your Realty of America Tech Stack comes preloaded with powerful tools to streamline transactions, manage clients, and boost productivity. Need more? Enhance your setup with add-ons tailored to your workflow.",
//       route: "/customize-agent-tools/step-1",
//       inputs: [
//         {
//           thisWrapperStyles: {},
//           render: [
//             {
//               type: "custom-comp",
//               name: "tools",
//               comp: (
//                 <BoxSelect
//                   formUtils={formUtils}
//                   AgentToolsData={AgentToolsData}
//                   isAgentToolsSuccess={isAgentToolsSuccess}
//                 />
//               ),
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// //roa-payment

// export const _ROAPayment = (
//   //@ts-expect-error test
//   paymentData,
//   ispaymentDataSuccess: boolean
// ): IMultipartInputList[] => {
//   return [
//     {
//       title: "Review & Complete Your Checkout",
//       desc: "You're almost there! Review your details and complete your payment.",
//       inputs: [
//         {
//           render: [
//             {
//               type: "custom-comp",
//               name: "payment",
//               required: false,
//               comp: (
//                 <CustomPayment
//                   paymentData={paymentData}
//                   ispaymentDataSuccess={ispaymentDataSuccess}
//                 />
//               ),
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const _PaymentSuccess = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "Your Payment was a Success!",
//       desc: "Your payment has been received, and you're one step closer to getting started.",
//       inputs: [],
//     },
//   ];
// };

// // roa-email

// export const _ROAEmail = (
//   EmailSuggestions: any,
//   checkEmailValidation: (e: React.ChangeEvent, input: string) => void,
//   validationmsg: Typevalidationmsg
// ): IMultipartInputList[] => {
//   return [
//     {
//       title: "Set Up Your Realty of America Email",
//       desc: "Your Realty of America email is your key to seamless communication and essential tools. We’ve reserved an email for you—simply confirm or select an alternate option, then set up a forwarding email.",
//       inputs: [
//         {
//           thisWrapperStyles: {
//             gap: "20px",
//           },
//           render: [
//             {
//               name: "roa_email",
//               type: "select",
//               required: true,
//               label: "Suggested ROA Email Address",
//               placeholder: "john.robertson@realtyofamerica.com",
//               options: EmailSuggestions,
//               inputOptions: {
//                 isCreatable: true,
//                 onCreateOption: (e) => {
//                   //@ts-expect-error ignore
//                   checkEmailValidation(e);
//                 },
//               },
//               otherRegProps: {
//                 onChange: (e) =>
//                   //@ts-expect-error ignore
//                   checkEmailValidation(e?.target?.value?.identity),
//               },
//               bottomDesc: validationmsg && (
//                 <Flex sx={{ gap: "10px" }}>
//                   <AppImage
//                     src={validationmsg?.status == "success" ? tick : xmark}
//                   ></AppImage>
//                   <AppText>
//                     {validationmsg?.status == "success"
//                       ? "This email address is available!"
//                       : validationmsg?.data?.roa_email[0] ||
//                         "Email Not Available"}
//                   </AppText>
//                 </Flex>
//               ),
//             },
//             {
//               name: "forwarding_email",
//               type: "text",
//               label: "Forwarding Email",
//               required: true,
//               placeholder: "Enter Forwarding Email",
//               bottomDesc:
//                 "Enter the email where messages sent to your ROA email address should be forwarded.",
//               inputOptions: {
//                 isCreatable: true,
//                 // onChange: (e) =>
//                 //   checkEmailValidation(e?.target?.value),
//               },
//             },
//             {
//               name: "roa_email_acknowledge",
//               type: "checkbox",
//               required: true,
//               inputStyles: {
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "start",
//               },
//               labelStyles: {
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "start",
//               },
//               options: [
//                 {
//                   value: "yes",
//                   label:
//                     "I acknowledge that my Realty of America email will be used for official communications and that I am responsible for maintaining an active and accessible forwarding email at all times.",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const _EmailSuccess = (): IMultipartInputList[] => {
//   return [
//     {
//       title: "You’re ROA Email Setup is Complete!",
//       desc: "Your Realty of America email is now ready to use. Below are the details of your setup",
//       inputs: [
//         {
//           render: [
//             {
//               name: "roa-emails",
//               type: "custom-comp",
//               required: false,
//               comp: <DisplayROAEmail />,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// };

// export const _licenceTransfer = (
//   licence_data: LicenseData[],
//   islicenceDataLoading: boolean,
//   refetchLicence: any
// ): IMultipartInputList[] => {
//   return [
//     {
//       title: "You’ve Completed Your Application",
//       desc: "Now, let’s finalize your license transfer so you can get fully set up. Follow the instructions below to complete your transfer, and we’ll handle the verification on our end.",
//       inputs: [
//         {
//           render: [
//             {
//               name: "licence_transfer",
//               type: "custom-comp",
//               comp: (
//                 <LicenseContainer
//                   licenses={licence_data}
//                   loading={islicenceDataLoading}
//                   refetchLicense={refetchLicence}
//                 />
//               ),
//             },
//           ],
//         },
//       ],
//     },
//   ];
//   // licences: [
//   //   {
//   //     state: "Arizona",
//   //     licenseNumber: "123456",
//   //     plannedTransferDate: "03/28/25",
//   //     status: {
//   //       label: "Transfer Complete!",
//   //       type: "success",
//   //       icon: "✔️",
//   //     },
//   //     associations: [
//   //       "Central Arizona Association of REALTORS®",
//   //       "Green Valley/Sahuarita Association of REALTORS®",
//   //     ],
//   //     instructions: "Arizona License Transfer Instructions",
//   //     confirmationText:
//   //       "I have completed my license transfer for Arizona and am ready for verification.",
//   //     additionalMessage: {
//   //       title: "Welcome to ROA Arizona!",
//   //       message:
//   //         "We've successfully accepted your license transfer for Arizona! You will be receiving emails on steps to access your ROA Agent Dashboard.",
//   //       type: "success",
//   //     },
//   //   },
//   //   {
//   //     state: "California",
//   //     licenseNumber: "123456",
//   //     plannedTransferDate: "03/28/25",
//   //     status: {
//   //       label: "Action Needed",
//   //       type: "error",
//   //       icon: "⚠️",
//   //     },
//   //     associations: [
//   //       "California Association of Real Estate Brokers (CAREB)",
//   //       "California Association of Realtors (C.A.R.)",
//   //     ],
//   //     instructions: "California License Transfer Instructions",
//   //     confirmationText:
//   //       "I have completed my license transfer for California and am ready for verification.",
//   //     additionalMessage: {
//   //       title: "Message from Support:",
//   //       message:
//   //         "There is an issue with transferring your license. Please reach out to the onboarding support team at your earliest convenience - Ticket ID # 1234556",
//   //       type: "error",
//   //     },
//   //   },
//   //   {
//   //     state: "Texas",
//   //     licenseNumber: "123456",
//   //     plannedTransferDate: "03/28/25",
//   //     status: {
//   //       label: "In Review",
//   //       type: "inreview",
//   //       icon: "🟡",
//   //     },
//   //     associations: [
//   //       "Houston Association of REALTORS® (HAR)",
//   //       "San Antonio Board of REALTORS® (SABOR)",
//   //     ],
//   //     instructions: "Texas License Transfer Instructions",
//   //     confirmationText:
//   //       "I have completed my license transfer for Texas and am ready for verification.",
//   //   },
//   //   {
//   //     state: "California",
//   //     licenseNumber: "123456",
//   //     plannedTransferDate: "03/28/25",
//   //     status: {
//   //       label: "Transfer Pending",
//   //       type: "pending",
//   //       icon: "⏳",
//   //     },
//   //     associations: [
//   //       "California Association of REALTORS® (C.A.R.)",
//   //       "National Association of REALTORS® (NAR)",
//   //     ],
//   //     instructions: "California License Transfer Instructions",
//   //     confirmationText:
//   //       "I have completed my license transfer for California and am ready for verification.",
//   //   },
//   //   {
//   //     state: "Kentucky",
//   //     licenseNumber: "123456",
//   //     plannedTransferDate: "03/28/25",
//   //     status: {
//   //       label: "Marketing Pending",
//   //       type: "marketing_pending",
//   //       icon: "⚠️",
//   //     },
//   //     associations: [
//   //       "Kentucky Association of Real Estate Brokers (KAREB)",
//   //       "Kentucky Association of Realtors (K.A.R.)",
//   //     ],
//   //     instructions: "Kentucky License Transfer Instructions",
//   //     confirmationText:
//   //       "I have completed my license transfer for Kentucky and am ready for verification.",
//   //     additionalMessage: {
//   //       title: "You're on the ROA Kentucky List!",
//   //       message:
//   //         "We're working on bringing Realty of America to Kentucky! You're on our list, and we’ll make sure you’re among the first to receive updates, key timelines, and next steps as we finalize our expansion plans.",
//   //       type: "marketing_pending",
//   //     },
//   //   },
//   // ],
//   // };
// };
