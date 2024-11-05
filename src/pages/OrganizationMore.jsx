import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import OrganizationMoreItem from '../components/OrganizationMoreItem'

function OrganizationMore() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [singleData, setSingleData] = useState({})
	const [refresh, setRefresh] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	function handleCheckSwitch(e) {
		singleData.status = e
		useAxios().put(`/organization/${id}`, singleData).then(res => {
			setRefresh(!refresh)
		})
	}

	// Delete part start
	const [deleteModal, setDeleteModal] = useState(false)
	function handleDeleteBtnClick() {
		setDeleteModal(true)
	}
	function handleSureDelete() {
		setDeleteModal(false)
		setIsLoading(true)
		useAxios().delete(`/organization/${id}`).then(res => {
			setTimeout(() => {
				setIsLoading(false)
				navigate(-1)
			}, 1500);
		})
	}
	// Delete part end

	useEffect(() => {
		useAxios().get(`/organization/${id}`).then(res => setSingleData(res.data))
	}, [refresh])
	return (
		<div className='p-5'>
			<div className="mb-5 flex items-center justify-between">
				<div className="flex items-center space-x-5">
					<ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.2] cursor-pointer' />
					<h2 className="font-bold text-[22px]">{singleData.name}</h2>
				</div>
				<div className="flex items-center space-x-5">
					<Switch onChange={handleCheckSwitch} checked={singleData.status} size='large' />
					<Button onClick={handleDeleteBtnClick} icon={isLoading ? <LoadingOutlined /> : <DeleteOutlined />} className='delete-btn' type='primary' size='large'>Delete</Button>
					<Button onClick={() => navigate(`/edit/${id}`)} icon={<EditOutlined />} className='update-btn' type='primary' size='large'>Update</Button>
				</div>
			</div>
			<div className="w-[70%] flex justify-between">
				<ul className="w-[49%] p-5 space-y-5 rounded-[15px] border-[1px] border-slate-400">
					<OrganizationMoreItem spanTitle={"ID"} strongTitle={singleData.id} />
					<OrganizationMoreItem spanTitle={"Nomi"} strongTitle={singleData.name} />
					<OrganizationMoreItem spanTitle={"INN"} strongTitle={singleData.inn} />
					<OrganizationMoreItem spanTitle={"Holati"} strongTitle={singleData.status ? "Foal" : "Faol emas"} />
				</ul>
				<ul className="w-[49%] p-5 space-y-5 rounded-[15px] border-[1px] border-slate-400">
					<OrganizationMoreItem spanTitle={"Direktor"} strongTitle={singleData.director} />
					<OrganizationMoreItem spanTitle={"Manzil"} strongTitle={singleData.address} />
					<OrganizationMoreItem spanTitle={"Yaratilgan vaqt"} strongTitle={singleData.createdAt} />
				</ul>
			</div>
			<Modal onOk={handleSureDelete} title="Siz bu tashkilotni ochirmoqchimisiz?" open={deleteModal} onCancel={() => setDeleteModal(false)}></Modal>
		</div>
	)
}

export default OrganizationMore