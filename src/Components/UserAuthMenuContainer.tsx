import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";

const UserAuthMenuContainer = ({
  isWhiteBg,
  getMenuBasedOnRole,
  isDarkNav = false,
}: {
  isWhiteBg: boolean;
  getMenuBasedOnRole: any;
  isDarkNav?: boolean;
}) => {
  //@ts-ignore
  const { setOpenLoginModal, setLoginModalInfo, user_data } = useAppStore();

  const isLoggedIn = user_data?.email;

  const location = useLocation();
  const pathName = location?.pathname;

  const router = useNavigate();

  const handleProfileClick = (type: string, link: string) => {
    const token = getCookie("token");
    if (token) {
      router(link);
    } else {
      handleLoginClick(type);
      return;
    }
  };

  const handleLoginClick = (type: string, signup?: string) => {
    if (signup) {
      setLoginModalInfo({ type: type });
    } else {
      setLoginModalInfo({ type: type });
    }
    setOpenLoginModal();
  };

  const loginDropDown = {
    navTitle: (
      <>
        <div className="dot-before">Login</div>
      </>
    ),
    dropDownData: {
      generalLinkTitle: "Profile",
      generalLink: [
        {
          text: "User Profile",
          onClick: () => handleProfileClick("userLogin", ""),
        },
        {
          text: "Agent Profile",
          onClick: () => handleProfileClick("agentLogin", "/agent/leads"),
        },
        {
          text: "Leader Dashboard",
          link: "",
        },
      ],
    },
  };

  // const optionsBasedOnRole = useMemo(() => getMenuBasedOnRole(), [])

  const getOptionsBasedOnRole = () => {
    return getMenuBasedOnRole();
    // return optionsBasedOnRole
  };

  const profileClickMenuOptions = {
    navTitle: (
      <AppLink href="/user/favorites">
        <Avatar
          size={"sm"}
          color={"white"}
          bg={!isDarkNav ? appColors.appPrimary[600] : appColors.appGrey[200]}
          src={user_data?.profile_pic}
          name={user_data?.first_name || user_data?.email}
        />
      </AppLink>
    ),
    dropDownData: {
      generalLinkTitle: "Profile",
      generalLink: getOptionsBasedOnRole(),
    },
  };

  return (
    <Flex alignItems={"center"} gap={"24px"}>
      {isLoggedIn ? (
        <>
          <AppNewMenuItem
            isWhiteBg={isWhiteBg}
            menuItemData={profileClickMenuOptions}
            loggedIn={true}
          />
        </>
      ) : (
        <>
          <AppNewMenuItem
            isWhiteBg={isWhiteBg}
            menuItemData={loginDropDown}
            loggedIn={false}
          />
          <AppButton onClick={() => handleLoginClick("userSignup")}>
            Sign up
          </AppButton>
        </>
      )}
    </Flex>
  );
};

export default UserAuthMenuContainer;
