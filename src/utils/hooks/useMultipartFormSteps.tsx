import { MoreAboutYourSelf } from "../../pages/Form/roa-application/MoreAboutYourSelf";
import { YourResidentialAddress } from "../../pages/Form/roa-application/YourResidentialAddress";
import { YourEmergencyContact } from "../../pages/Form/roa-application/YourEmergencyContact";
import { useLocation, useNavigate } from "react-router-dom";
import AreYouLicensedInMultipleStates from "../../pages/Form/roa-application/AreYouLicensedInMultipleStates";
import RealEstateLicenseDetails from "../../pages/Form/roa-application/RealEstateLicenseDetails";
import YourProffExpDetails from "../../pages/Form/roa-application/YourProffExpDetails";
import WhoIsYourSponsorAgent from "../../pages/Form/roa-application/WhoIsYourSponsorAgent";
import AreYouPartOfTeam from "../../pages/Form/roa-application/AreYouPartOfTeam";
import WouldYouLikeToJoinAteam from "../../pages/Form/roa-application/WouldYouLikeToJoinAteam";
import AnyDisciplinaryactions from "../../pages/Form/roa-application/AnyDisciplinaryActions";
import TellAbtYourTeam from "../../pages/Form/roa-application/TellAbtYourTeam";
// import TellAbtYourTeamTwo from "../../pages/Form/roa-application/TellAbtYourTeamTwo";
import UploadSupportingDocs from "../../pages/Form/roa-application/UploadSupportingDocs";
import LicenseBoardsAndMLS from "../../pages/Form/roa-application/LicenseBoardsAndMLS";
import SuccessPage from "../../pages/Form/roa-application/SuccessPage";
import ReviewPage from "../../pages/Form/roa-application/ReviewPage";
import LetsFindYourTeam from "../../pages/Form/roa-application/LetsFindYourTeam";
import TaxInformationDetails from "../../pages/Form/tax-information/TaxInformationDetails";
import PaymentFromROA from "../../pages/Form/tax-information/PaymentFromROA";
import AgentTools from "../../pages/Form/custom-agent-tools/AgentTools";
import LicenceTranfer from "../../pages/Form/licence-transfer/LicenseTranfer";
import { FieldValues } from "react-hook-form";

const useMultipartFormSteps = ({ values }: { values: FieldValues }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const inputSectionAndSteps = {
    "roa-application": {
      id: 2,
      stage: "ROA Application",
      route: "roa-application",
      steps: [
        {
          id: 1,
          route: "/roa-application/about-yourself",
          comp: <MoreAboutYourSelf />,
          getData: "returnMoreAboutYourSelfFields",
        },
        {
          id: 2,
          route: "/roa-application/your-residential-address",
          comp: <YourResidentialAddress />,
          getData: "returnYourResidentialDetailsFields",
        },
        {
          id: 3,
          route: "/roa-application/your-emergency-contact",
          comp: <YourEmergencyContact />,
          getData: "returnYourEmergencyContactDetailsFields",
        },
        {
          id: 4,
          route: "/roa-application/licensed-in-multiple-states",
          comp: <AreYouLicensedInMultipleStates />,
          getData: "returnIsLicensedInMultipleStates",
        },
        {
          id: 5,
          route: "/roa-application/licensed-details",
          comp: <RealEstateLicenseDetails />,
          getData: "returnLicenseDetails",
          validate: "returnValidateLicenseDetails",
        },
        {
          id: 6,
          route: "/roa-application/real-estate-boards",
          comp: <LicenseBoardsAndMLS />,
          getData: "returnBoardsAndMls",
        },
        {
          id: 61,
          route: "/roa-application/formal-actions",
          comp: <AnyDisciplinaryactions />,
          getData: "returnFormalActions",
        },
        {
          id: 7,
          route: "/roa-application/professional-experience",
          comp: <YourProffExpDetails />,
          getData: "returnProffExp",
        },
        {
          id: 8,
          route: "/roa-application/sponsoring-agent",
          comp: <WhoIsYourSponsorAgent />,
          validate: "returnValidateSponsor",
          getData: "returnSponsorData",
        },
        {
          id: 9,
          route: "/roa-application/part-of-team",
          comp: <AreYouPartOfTeam />,
          getData: "returnIsPartOfTeam",
        },
        {
          id: 10,
          route: "/roa-application/join-a-team",
          comp: <WouldYouLikeToJoinAteam />,
        },
        {
          id: 11,
          route: "/roa-application/find-your-team",
          comp: <LetsFindYourTeam />,
        },
        {
          id: 12,
          route: "/roa-application/about-your-team",
          comp: <TellAbtYourTeam />,
        },
        {
          id: 13,
          route: "/roa-application/team-supporting-docs",
          comp: <UploadSupportingDocs />,
        },
        {
          id: 14,
          route: "/roa-application/success",
          comp: <SuccessPage />,
        },
        {
          id: 15,
          route: "/roa-application/review",
          comp: <ReviewPage />,
        },
      ],
    },
    "tax-information": {
      id: 3,
      stage: "Tax Information",
      route: "tax-information",
      steps: [
        {
          id: 1,
          route: "/tax-information/step-1",
          comp: <TaxInformationDetails />,
        },
        {
          id: 2,
          route: "/tax-information/step-2",
          comp: <PaymentFromROA />,
        },
        {
          id: 3,
          route: "/tax-information/step-3",
        },
      ],
    },
    "sign-your-ica": {
      id: 4,
      stage: "Sign Your ICA",
      route: "sign-your-ica",
      steps: [
        {
          id: 1,
          route: "/sign-your-ica/step-1",
        },
        {
          id: 2,
          route: "/sign-your-ica/step-2",
        },
        {
          id: 3,
          route: "/sign-your-ica/step-3",
        },
      ],
    },
    "customize-agent-tools": {
      id: 5,
      stage: "Customize Agent Tools",
      route: "customize-agent-tools",
      steps: [
        {
          id: 1,
          route: "/customize-agent-tools/step-1",
          comp: <AgentTools />,
        },
      ],
    },
    // {
    //   id: 6,
    //   stage: "Pay & Checkout",
    //   route: "pay-and-checkout",
    // },
    // {
    //   id: 7,
    //   stage: "Setup Your ROA Email",
    //   route: "setup-roa-email",
    // },
    "transfer-license": {
      id: 8,
      stage: "Transfer License",
      route: "/transfer-license",
      steps: [
        {
          id: 1,
          route: "/transfer-license/step-1",
          comp: <LicenceTranfer />,
        },
      ],
    },
  };

  const getCurrentStep = () => {
    const dynamicPath = pathname.replace("/agent-onboarding/form", "");

    for (const section of Object.values(inputSectionAndSteps)) {
      const step = section?.steps?.find((s) => s?.route === dynamicPath);
      if (step) return step;
    }

    return null; // Return null if no matching step is found
  };

  const goNextStep = (nextRoute = null) => {
    const dynamicPath = pathname.replace("/agent-onboarding/form", "");

    const sectionKeys = Object.keys(inputSectionAndSteps);

    for (let i = 0; i < sectionKeys.length; i++) {
      //@ts-expect-error ignore
      const section = inputSectionAndSteps[sectionKeys[i]];
      const currentIndex = section?.steps?.findIndex(
        //@ts-expect-error ignore
        (s) => s?.route === dynamicPath
      );

      if (currentIndex !== -1) {
        // If a nextRoute is provided, navigate to it directly
        if (nextRoute) {
          navigate(`/agent-onboarding/form${nextRoute}`, {
            replace: true,
          });
          return;
        }

        // If there is a next step in the current section, go there
        if (section?.steps[currentIndex + 1]) {
          navigate(
            `/agent-onboarding/form${section.steps[currentIndex + 1].route}`,
            {
              replace: true,
            }
          );
          return;
        }

        // If it's the last step in the current section, go to the first step of the next section
        if (sectionKeys[i + 1]) {
          //@ts-expect-error ignore
          const nextSection = inputSectionAndSteps[sectionKeys[i + 1]];
          if (nextSection?.steps?.length > 0) {
            navigate(`/agent-onboarding/form${nextSection.steps[0].route}`, {
              replace: true,
            });
            return;
          }
        }

        // If no next step exists, do nothing (end of all steps)
        return;
      }
    }
  };

  const goBackStep = () => {
    const dynamicPath = pathname.replace("/agent-onboarding/form", "");
    const sectionKeys = Object.keys(inputSectionAndSteps);

    for (let i = 0; i < sectionKeys.length; i++) {
      //@ts-expect-error ignore
      const section = inputSectionAndSteps[sectionKeys[i]];
      const currentIndex = section.steps.findIndex(
        //@ts-expect-error ignore
        (s: unknown) => s.route === dynamicPath
      );

      if (currentIndex !== -1) {
        const backIndex = currentIndex - 1;

        while (backIndex >= 0) {
          const prevStep = section.steps[backIndex];
          const isPartOfTeam = values["is_part_of_team"];

          // Skip steps based on certain conditions
          if (
             
            [
              "/roa-application/about-your-team",
              "/roa-application/team-supporting-docs",
              "/roa-application/find-your-team",
            ]?.includes(prevStep?.route) &&
            isPartOfTeam == "false"
          ) {
            navigate(`/agent-onboarding/form/roa-application/part-of-team`, {
              replace: true,
            });
            return;
          } else {
            navigate(`/agent-onboarding/form${prevStep.route}`, {
              replace: true,
            });
            return;
          }
        }

        // Handle jump to last step of previous section if needed
      }
    }
  };

  return { getCurrentStep, goNextStep, inputSectionAndSteps, goBackStep };
};

export default useMultipartFormSteps;
