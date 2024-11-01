import { AppleOutlined, BellOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
	return (
		<div className='py-5 px-6 border-b-[1px] border-white bg-[#001529] flex items-center justify-between'>
			<Link className='pl-1 flex items-center gap-[20px] text-white' to={"/"}>
				<AppleOutlined className='scale-[2]' />
				<span className="text-[25px] leading-[20px] font-semibold">Apple</span>
			</Link>
			<div className="flex items-center gap-[36px]">
				<Badge count={5} size='small'>
					<BellOutlined className='scale-[1.6] text-white'/>
				</Badge>
				<Button size='middle' type='primary'>Log out</Button>
			</div>
		</div>
	)
}

export default Header