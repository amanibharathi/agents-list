import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 
import { truncateString } from '../../../../utils/functions/commonFunctions';


interface IRoute {
  text: string;
  link?: string;
}

interface Props {
  route: IRoute[];
  wrapperClassName?: string;
  isAgentDashboard?: boolean;
}

const AdminBreadcrumbs: React.FC<Props> = ({
  route,
  wrapperClassName,
  isAgentDashboard,
}) => {
  const navigate = useNavigate(); // react-router navigation

  return (
    <Breadcrumb
      className={`${isAgentDashboard ? 'pt-0' : 'pt-[40px]'} ${wrapperClassName || ''}`}
      color={isAgentDashboard ? '#10295A' : '#444444'}
    >
      {route?.map((item, i) => (
        <BreadcrumbItem
          color={isAgentDashboard ? '#10295A' : '#444444'}
          key={item.text}
        >
          <BreadcrumbLink
            _hover={{
              textDecoration: 'none !important',
            }}
            onClick={() => {
              if (item.link) navigate(item.link);
            }}
          >
            <Text
              fontSize={isAgentDashboard ? '12px' : '16px'}
              fontWeight={i === route.length - 1 ? 600 : 400}
              color={`${i === route.length - 1
                ? isAgentDashboard
                  ? '#010101'
                  : '#10295A'
                : isAgentDashboard
                  ? '#10295A'
                  : '#444444'
                } !important`}
              textTransform="capitalize"
            >
              {truncateString(item.text, 40)}
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default AdminBreadcrumbs;
