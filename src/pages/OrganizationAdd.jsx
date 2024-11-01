import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Button, Checkbox, DatePicker, Input } from 'antd'
import { AppstoreAddOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useAxios } from '../hook/useAxios'

function OrganizationAdd() {
	const navigate = useNavigate()
	const [name, setName] = useState("")
	const [inn, setInn] = useState("")
	const [director, setDirector] = useState("")
	const [address, setAddress] = useState("")
	const [createdAt, setCreatedAt] = useState("")
	const [status, setStatus] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	function handleAddOrganization(e) {
		e.preventDefault()
		setIsLoading(true)
		const data = { name, inn, director, address, status, createdAt }
		toast.success("Jarayonda...")
		useAxios().post("/organization", data).then(res => {
			setTimeout(() => { toast.success("Saqlandi") }, 500)
			setTimeout(() => {
				setIsLoading(false)
				navigate(-1)
			}, 1000)
		})
	}

	return (
		<form onSubmit={handleAddOrganization} className='p-5'>
			<Toaster position="top-center" reverseOrder={false} />
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-5">
					<ArrowLeftOutlined onClick={() => navigate(-1)} className='scale-[1.2] cursor-pointer' />
					<h2 className="font-bold text-[22px] leading-[20px]">Tashkilot qoshish</h2>
				</div>
				<Button htmlType='submit' icon={isLoading ? <LoadingOutlined /> : <AppstoreAddOutlined />} type='primary' size="large">Saqlash</Button>
			</div>
			<div className="mt-5 flex justify-between w-[70%]">
				<div className="w-[49%] p-5 border-[1px] space-y-5 border-slate-400 rounded-[15px]">
					<label className="flex flex-col">
						<span className="text-[16px] mb-1 text-slate-500">Nom kiriting</span>
						<Input value={name} onChange={(e) => setName(e.target.value)} required autoComplete='off' placeholder='Nom kiriting' size='large' allowClear />
					</label>
					<label className="flex flex-col">
						<span className="text-[16px] mb-1 text-slate-500">Inn kiriting</span>
						<Input type='number' value={inn} onChange={(e) => setInn(e.target.value)} required autoComplete='off' placeholder='Inn kiriting' size='large' allowClear />
					</label>
					<label className="flex flex-col">
						<span className="text-[16px] mb-1 text-slate-500">Direktor ismini kiriting</span>
						<Input value={director} onChange={(e) => setDirector(e.target.value)} required autoComplete='off' placeholder='Ism kiriting' size='large' allowClear />
					</label>
				</div>
				<div className="w-[49%] p-5 border-[1px] space-y-5 border-slate-400 rounded-[15px]">
					<label className="flex flex-col">
						<span className="text-[16px] mb-1 text-slate-500">Manzil kiriting</span>
						<Input value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete='off' placeholder='Manzil kiriting' size='large' allowClear />
					</label>
					<label className="flex flex-col">
						<span className="text-[16px] mb-1 text-slate-500">Yaratilgan vaqt</span>
						<DatePicker onChange={(a, b) => setCreatedAt(b)} size='large' placeholder="vaqtni kiriting" />
					</label>
					<label className="flex flex-col">
						<span className="text-[16px] mb-1 text-slate-500">Holati</span>
						<Checkbox checked={status} onChange={(a) => setStatus(a.target.checked)}>Holati</Checkbox>
					</label>
				</div>
			</div>
		</form>
	)
}

export default OrganizationAdd