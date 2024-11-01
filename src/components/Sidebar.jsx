import React, { useState } from 'react';
import { BankOutlined, LineOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { usePath } from '../hook/usePath';
const items = [
	{
		key: '1',
		icon: <BankOutlined className='scale-[1.4] pr-2' />,
		label: 'Tashkilotlar',
		children: [
			{
				key: '11',
				label: <Link to={usePath.organization}>Mening Tashkilotim</Link>,
				icon: <LineOutlined className='scale-[1.4] pr-2' />
			}
		],
	}, {
		key: '2',
		icon: <UsergroupAddOutlined className='scale-[1.4] pr-2' />,
		label: 'Foydalanuvchilar',
		children: [
			{
				key: '21',
				label: <Link to={usePath.administration}>Administratorlar</Link>,
				icon: <LineOutlined className='scale-[1.4] pr-2' />
			}, {
				key: '22',
				label: <Link to={usePath.students}>Oquvchilar</Link>,
				icon: <UserOutlined className='scale-[1.4] pr-2' />
			}
		],
	}
];

const getLevelKeys = (items1) => {
	const key = {};
	const func = (items2, level = 1) => {
		items2.forEach((item) => {
			if (item.key) {
				key[item.key] = level;
			}
			if (item.children) {
				func(item.children, level + 1);
			}
		});
	};
	func(items1);
	return key;
};
const levelKeys = getLevelKeys(items);

const Sidebar = () => {
	const [stateOpenKeys, setStateOpenKeys] = useState(['1', '101']);
	const onOpenChange = (openKeys) => {
		const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
		if (currentOpenKey !== undefined) {
			const repeatIndex = openKeys.filter((key) => key !== currentOpenKey).findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
			setStateOpenKeys(openKeys.filter((_, index) => index !== repeatIndex).filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]));
		} else {
			setStateOpenKeys(openKeys);
		}
	};
	return (
		<Menu mode="inline" theme='dark' defaultSelectedKeys={['231']} openKeys={stateOpenKeys} onOpenChange={onOpenChange} style={{ width: "22%", height: "88.8vh" }} items={items} />
	);
};
export default Sidebar;