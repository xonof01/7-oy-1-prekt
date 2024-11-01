import React from 'react'

function OrganizationMoreItem({ spanTitle, strongTitle }) {
	return (
		<li className="flex flex-col">
			<span className="text-[16px] text-slate-400 mb-[5px]">{spanTitle}</span>
			<strong className="text-[20px] leading-[18px]">{strongTitle}</strong>
		</li>
	)
}

export default OrganizationMoreItem