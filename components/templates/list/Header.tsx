import * as React from 'react';
import styled from 'styled-components';
import { MainHeader } from '../../../styles/BaseStyle';
import MenuIcon from '../../../public/assets/icn-menu.svg';
import AddPerson from '../../../public/assets/icn-addperson.svg';
import Text from '../../UI/atoms/Text';

interface Props {
}

const Header: React.FC<Props> = (props) => {
  return (
    <MainHeader>
        <MenuIcon />
        <Text content='채팅' color='white' weight='bold' size='large'/>
        <MenuIconWrapper>
          <AddPerson />
        </MenuIconWrapper>
    </MainHeader>
  );
};

export default Header;


const MenuIconWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  text-align: right;
  & > svg {
    margin-left: 1rem;
  }
`;