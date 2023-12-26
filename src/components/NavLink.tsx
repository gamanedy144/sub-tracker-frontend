import React, { FC, ReactElement, ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Icon, Text, flexbox } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  faChartPie,
  faClockRotateLeft,
  faCog,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface NavLinkProps {
  to: string;
  children: ReactNode;
  showText?: boolean;
  iconName: string;
}
const NavLink: FC<NavLinkProps> = ({
  to,
  children,
  showText = true,
  iconName,
}) => {
  const location = useLocation();
  const getIcon = (iconName: string): ReactElement => {
    switch (iconName) {
      case 'home':
        return <Icon as={FontAwesomeIcon} icon={faHouse} boxSize={8} />;
      case 'insight':
        return <Icon as={FontAwesomeIcon} icon={faChartPie} boxSize={8} />;
      case 'settings':
        return <Icon as={FontAwesomeIcon} icon={faCog} boxSize={8} />;
      case 'report':
        return (
          <Icon as={FontAwesomeIcon} icon={faClockRotateLeft} boxSize={8} />
        );
      default:
        return <CloseIcon />;
    }
  };

  return (
    <RouterLink
      to={to}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {getIcon(iconName)}
      {showText && (
        <Text
          fontWeight={location.pathname === to ? 'bold' : 'normal'}
          fontSize={18}
        >
          {children}
        </Text>
      )}
    </RouterLink>
  );
};

export default NavLink;
