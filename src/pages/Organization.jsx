import React, { useEffect, useState } from 'react'
import { Input, Modal, Select, Switch } from 'antd';
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useDebounce from '../hook/useDebounce'
import { usePath } from '../hook/usePath';
import { useAxios } from '../hook/useAxios';
import PageAddInfo from '../components/PageAddInfo'
import CustomTable from '../components/CustomTable'
import { useNavigate } from 'react-router-dom';

function Organization() {
	const navigate = useNavigate()
	const [tBodyData, setTBodyData] = useState([])
	const [innData, setInnData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)

	const tHeadData = [
		{
			title: 'ID',
			dataIndex: 'key',
		}, {
			title: 'Nomi',
			dataIndex: 'name',
		}, {
			title: 'INN',
			dataIndex: 'inn',
		}, {
			title: 'Director',
			dataIndex: 'director',
		}, {
			title: 'Yaratilgan vaqt',
			dataIndex: 'createdAt',
		}, {
			title: 'Manzil',
			dataIndex: 'address',
		}, {
			title: 'Holati',
			dataIndex: 'status',
		}, {
			title: 'Batafsil',
			dataIndex: 'action',
		},
	];
	const [searchData, setSearchData] = useState("")
	function handleSearchOrganization(e) {
		setIsLoading(true)
		setSearchData(e.target.value.toLowerCase())
		if (!e.target.value) {
			setTimeout(() => setRefresh(!refresh), 1200)
		}
	}
	const searchByName = useDebounce(searchData, 1000)
	useEffect(() => {
		if (searchByName) {
			setIsLoading(false)
			const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
			setTBodyData(filteredData)
		}
	}, [searchByName])
	const [innId, setInnId] = useState("")
	function handleInnSelectChange(e) {
		setIsLoading(true)
		setTimeout(() => setInnId(e), 1000)
	}
	const [deleteModal, setDeleteModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	function handleDelete(id) {
		setDeleteModal(true)
		setDeleteId(id)
	}
	function handleSureDelete() {
		setDeleteModal(false)
		setIsLoading(true)
		useAxios().delete(`/organization/${deleteId}`).then(res => {
			setTimeout(() => {
				setIsLoading(false)
				setRefresh(!refresh)
			}, 1000);
		})
	}
	function handleChangeSwitch(item, evt) {
		item.status = evt
		useAxios().put(`/organization/${item.id}`, item).then(res => {
			setRefresh(!refresh)
		})
	}
	useEffect(() => {
		useAxios().get(`/organization?id=${innId ? innId : ""}`).then(res => {
			setIsLoading(false)
			setTBodyData(res.data.map((item, index) => {
				item.action = <div className="flex items-center gap-[22px]">
					<EditOutlined onClick={() => navigate(`/edit/${item.id}`)} className='scale-[1.2] hover:scale-[1.5] duration-500 cursor-pointer hover:text-blue-600' />
					<DeleteOutlined onClick={() => handleDelete(item.id)} className='scale-[1.2] hover:scale-[1.5] duration-500 cursor-pointer hover:text-red-600' />
					<DashOutlined onClick={() => navigate(`${item.id}`)} className='scale-[1.2] hover:scale-[1.5] duration-500 cursor-pointer hover:text-green-600' />
				</div>
				item.key = index + 1
				item.status = <Switch size='small' onChange={(evt) => handleChangeSwitch(item, evt)} checked={item.status} />
				return item
			}))
		})
	}, [refresh, innId])
	useEffect(() => {
		useAxios().get("/organization").then(res => {
			setInnData(res.data.map(item => {
				const data = {
					label: `INN: ${item.inn}`,
					value: item.id
				}
				return data
			}))
		})
	}, [])
	// axios get all end

	return (
		<div className='p-6'>
			<PageAddInfo addPath={usePath.organizationAdd} title={"Tashkilotlar"} text={"Tashkilotlar"} count={8} btnTitle={"Qoshish"} />
			<div className="w-[630px] my-5 flex items-center gap-[30px]">
				<Input onChange={handleSearchOrganization} allowClear placeholder='Qidirish...' type='text' size='large' />
				<Select onChange={handleInnSelectChange} allowClear showSearch placeholder="INN Tanlash" optionFilterProp="label" size="large" options={innData} />
			</div>
			<CustomTable isLoading={isLoading} tHead={tHeadData} tBody={tBodyData} />
			<Modal onOk={handleSureDelete} title="Siz bu tashkilotni ochirmoqchimisiz?" open={deleteModal} onCancel={() => setDeleteModal(false)}></Modal>
		</div>
	)
}

export default Organization