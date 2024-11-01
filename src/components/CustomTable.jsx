import React, { useState } from 'react';
import { Table } from 'antd';
const CustomTable = ({ tHead, tBody, isLoading }) => {
	const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 4 } })
	function handleTableChange(a) { setTableParams({ pagination: a }) }
	return <Table pagination={tableParams.pagination} onChange={handleTableChange} loading={isLoading} className='shadow-lg shadow-[#9fa838] rounded-[15px]' columns={tHead} dataSource={tBody} />
};
export default CustomTable;