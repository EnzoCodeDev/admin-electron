import './menu.scss';
import React from 'react';
import { Menu as MenuAntd } from 'antd';
import { useNavigate } from 'react-router-dom';
import { menuUser } from './menuOption';
import { menuAdmin } from './menuAdmin';
import userStore from '../../store/userStore';

// const { Sider } = Layout;
// const { SubMenu } = Menu;

// export const Menu = ({ expanded, setExpanded }) => {
//   const userTienda = userStore((state) => state);
//   return (
//     <div className={'container-menu ' + (expanded ? ' active' : ' inactive')}>
//       {/* <Sider className='sub-container-menu' collapsible collapsed={!expanded} onCollapse={setExpanded}>
//         <TypeMenu typeUser={userTienda['typeUser']} setExpanded={setExpanded} />
//       </Sider> */}
//     </div>
//   );
// };

export const Menu = ({ expanded, setExpanded }) => {
  let navigate = useNavigate();
  const userTienda = userStore((state) => state);

  let RouterValidate =
    userTienda["typeUser"] === "admin"
      ? menuAdmin
      : menuUser;
  return (
    <MenuAntd
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={expanded}
      items={RouterValidate}
    />
    // <Menu mode="inline" defaultSelectedKeys={['1']}>
    //   {typeUser === 'admin' && (
    //     <React.Fragment>
    //       {menuAdmin.map((item, index) => (
    //         <SubMenu key={index} title={item['label']} icon={item['icon']}>
    //           {item.children.map((itemSub, indexSub) => (
    //             <Menu.Item onClick={() => { navigate(itemSub['navigate']); setExpanded(false); }} key={`${index}-${indexSub}`} icon={itemSub['icon']}>
    //               {itemSub['label']}
    //             </Menu.Item>
    //           ))}
    //         </SubMenu>
    //       ))}
    //     </React.Fragment>
    //   )}
    //   {typeUser === 'user' && (
    //     <React.Fragment>
    //       {menuUser.map((item, index) => (
    //         <SubMenu key={index} title={item['label']} icon={item['icon']}>
    //           {item.children.map((itemSub, indexSub) => (
    //             <Menu.Item onClick={() => { navigate(itemSub['navigate']); setExpanded(false); }} key={`${index}-${indexSub}`} icon={itemSub['icon']}>
    //               {itemSub['label']}
    //             </Menu.Item>
    //           ))}
    //         </SubMenu>
    //       ))}
    //     </React.Fragment>
    //   )}
    // </Menu>
  );
}
