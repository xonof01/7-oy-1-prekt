import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAxios } from '../../hook/useAxios';
import { Context } from '../../context/Context';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';

const SignIn = () => {
	const {token, setToken} = useContext(Context)
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const onFinish = () => {
		const data = { userName, password }
		setIsLoading(true)
		useAxios().get("/users").then(res => {
			const isUser = res.data.some(item => item.username == data.userName && item.password == data.password)
			if (isUser) {
				setTimeout(() => {
					setIsLoading(false)
					toast.success("Xush kelibsiz " + data.userName)
					setToken(data)
				}, 1000)
			} else {
				setTimeout(() => {
					setIsLoading(false)
					toast.error("Foydalanuvchi topilmadi!")
					setUserName("")
					setPassword("")
				}, 1000)
			}
		})
	}
	return (
		<div className="w-full h-[100vh] relative">
			<Toaster position="top-center" reverseOrder={false}/>
			<Form
				className='absolute w-[500px] space-y-4 inset-0 h-[200px] m-auto'
				name="basic"
				onFinish={onFinish}
				autoComplete="off">
				<Input value={userName} required placeholder='Ismingizni kiriting' onChange={(e) => setUserName(e.target.value)} name="username" size='large' />
				<Input.Password value={password} required placeholder='Parol kiriting' onChange={(e) => setPassword(e.target.value)} name="password" size='large' />
				<Button icon={isLoading ? <LoadingOutlined/> : <LoginOutlined/>} size='large' className='w-full' type="primary" htmlType="submit">Submit</Button>
			</Form>
		</div>
	)
}
export default SignIn;