import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Administration, Students, OrganizationAdd, OrganizationMore } from '../pages';
import { usePath } from '../hook/usePath';
import DLoading from '../assets/Images/D-Loading.png';

const Organization = lazy(() => new Promise((resolve) => {
	return setTimeout(() => resolve(import("../pages/Organization")), 1500);
}))

function CustomRoutes() {
	return (
		<Routes>
			<Route path={usePath.organization} element={<Suspense fallback={
				<div className='w-full h-[100vh] fixed inset-0 bg-[#001529]'>
					<img className='w-[300px] h-[300px] mx-auto mt-[100px]' src={DLoading} alt="Loading..." width={300} height={300} />
				</div>
			}><Organization /></Suspense>} />
			<Route path={usePath.organizationAdd} element={<OrganizationAdd />} />
			<Route path={usePath.organizationEdit} element={<OrganizationAdd />} />
			<Route path={usePath.organizationMore} element={<OrganizationMore />} />
			<Route path={usePath.administration} element={<Administration />} />
			<Route path={usePath.students} element={<Students />} />
		</Routes>
	)
}

export default CustomRoutes