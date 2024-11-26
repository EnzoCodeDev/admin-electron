import React from 'react';
import { Menu as MenuAntd, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { menuAdmin } from './menuAdmin';
import './menu.scss';

const { Sider } = Layout;
const { SubMenu } = MenuAntd;

export const Menu = ({ expanded, setExpanded }) => {
  const navigate = useNavigate();

  return (
    <Sider
      collapsible
      collapsed={!expanded}
      onCollapse={setExpanded}
      className={`container-menu ${expanded ? 'active' : 'inactive'}`}
    >
      <MenuAntd
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        {menuAdmin.map((item, index) => (
          <SubMenu
            key={`menu-${index}`}
            title={item.label}
            icon={item.icon}
          >
            {item.children.map((subItem, subIndex) => (
              <MenuAntd.Item
                key={`submenu-${index}-${subIndex}`}
                icon={subItem.icon}
                onClick={() => {
                  navigate(subItem.navigate);
                  setExpanded(false);
                }}
              >
                {subItem.label}
              </MenuAntd.Item>
            ))}
          </SubMenu>
        ))}
      </MenuAntd>
    </Sider>
  );
};
