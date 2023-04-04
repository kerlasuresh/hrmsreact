import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import { GrEdit , GrAddCircle } from "react-icons/gr";
import { useForm } from 'react-hook-form'
import LeaveInnerNav from '../LeaveManagement/InnerNav/LeaveInnerNav';

function LeaveRules() {
	const [onClickIconCondition, setOnClickIconCondition] = useState(true)
	const [onClickLeavesCountCondition, setOnClickLeavesCountCondition] = useState(true)
	const [onClickAccrualCondition, setOnClickAccrualCondition] = useState(true)
	const [onClickApplicabilityCondition, setOnClickApplicabilityCondition] = useState(true)
	const [onClickCarryForwardCondition, setOnClickCarryForwardCondition] = useState(true)
	const { register, handleSubmit, trigger, formState: { errors }, setValue } = useForm();
	const [leavesList, setLeavesList] = useState([
		{
			name : "Causal Leaves",
			 isACtive : true
		},
		{
			name : "Earned Leave",
			 isACtive : false
		},
		{
			name : "Maternity Leave", isACtive : false
		},
		{
			name : "Paternity Leave", isACtive : false
		},
		{
			name : "Loss Of Pay", isACtive : false
		}
	])
		const [changeLeavesValues, setChangeLeavesValues] = useState({ name: `Causal Leaves ` , isACtive : false})
        const onSubmit = (data) => { console.log(data)
			alert('sucess')
		
	}











	 //fns
	const onClickIcon =()=>{
         setOnClickIconCondition(!onClickIconCondition)
	}
	const onClickLeavesCount =()=>{
         setOnClickLeavesCountCondition(!onClickLeavesCountCondition)
	}
	const onClickAccrual =()=>{
         setOnClickAccrualCondition(!onClickAccrualCondition)
	}
	const onClickApplicability =()=>{
         setOnClickApplicabilityCondition(!onClickApplicabilityCondition)
	}
	const onClickCarryForward =()=>{
         setOnClickCarryForwardCondition(!onClickCarryForwardCondition)
	}
	const generateNewLeave = (value) => {
    // setAddNewRuleCondition(true)
    // setAddWeekTableCondition(true)
    // leavesList.map((list, i) => {
    //   return list.currentShow = false;
    // })
	leavesList.map((leave, i)=>{
		leave.isACtive = false;
		return leave;
	})
    setLeavesList([...leavesList, { name: 'Custom Leave Rule',isACtive:true}])
	console.log('gen ui',leavesList)
	 
    console.log("data",leavesList);
	setChangeLeavesValues({ name: `Custom Leave Rule  ` })
  }
  const ChangeLeaveValues = (value, id) => {
  console.log('click value',value)
  leavesList.map((leave, i)=>{
	if(leave.name === value.name){
		leave.isACtive = true;
	}else{
		leave.isACtive = false;
	}
	return leave;
  })
  setChangeLeavesValues(value)
 setLeavesList([...leavesList])
    // console.log("data",leavesList);
  }
  
  return (
    <>
	<div className="container-fluid">
        <LeaveInnerNav />
      </div>

	<div className='container'>
		<div className='row mt-2'>
			<div className='col-md-4'>
				{leavesList.map((names,id)=>{
					return <Card className='mt-1  ' onClick={()=>ChangeLeaveValues(names, id)}>
						<Card.Header style={{borderLeft: names.isACtive ? "3px solid orange" : "3px solid gray"}}>
							<div>
								<div className='fw-bold'>{names.name}</div>
								<div className=''>values</div>
							</div>
						</Card.Header>
					</Card>
				})}
				<Card className='mt-3' onClick={()=>generateNewLeave()}>
						<Card.Header >
							<div className='text-center'>
								<div className='fw-bold'> <GrAddCircle/> Create Custom Leave Rules</div>
							</div>
						</Card.Header>
				</Card>
				
				
				
				
				
			</div>
			<div className='col-md-8'>
						<Card>
							<Card.Header>
								<Nav variant="pills" defaultActiveKey="#first">
									<Nav.Item>
									<Nav.Link href="#first">General Settings</Nav.Link>
									</Nav.Item>
									<Nav.Item>
									<Nav.Link href="#link">Advanced Settings</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Header className='bg-white oncardHeaderHover'  >
								{onClickIconCondition ? <div>
									<div>
										<div className="d-flex bd-highlight mb-3 fw-bold">
											<div className="me-auto  bd-highlight">{changeLeavesValues.name}</div>
											<div className="bd-highlight icontoShow" onClick={onClickIcon} ><GrEdit/></div>
										</div>
										<p>like name</p>
									</div>
									<div>
										<p className='fw-bold'>Description</p>
										<p>like name</p>
									</div>
								</div> : 
									<div>
										<form onSubmit={handleSubmit(onSubmit)}>
											<div>
												<label >Name</label >
												<div className='w-50'>
													<input
														className="form-control"
														type="text"
														maxLength={20}
														{...register('Name', {
														required: 'Please enter name',

														pattern: {
															value: /^[a-zA-Z\s]+$/,
															message: 'Please enter valid name',
														},
														pattern: {
															value: /^[^.\s]/,
															message: 'first character space not allowed ',
														},
														})}
														onKeyUp={() => {
														trigger('Name')
														}}
													/>
													<p className="text-start">
														{errors.Name && (
														<span className="text-danger ">
															{errors.Name.message}
														</span>
														)}
													</p>
											    </div>
									       </div>
										   <div>
												<label >Description</label >
												<div className='w-50'>
													 <textarea
														className='form-control'
														{...register("leaveDescription", {
															required: "This Field is Required",
														})}
														onKeyUp={() => {
															trigger("leaveDescription");
														}}	>
															
													</textarea>
													<p>{errors.leaveDescription && (
													<small className='text-danger'>
														{errors.leaveDescription.message}
													</small> )}</p>
											    </div>
									       </div>
										   <div className="text-right">
													<Button variant='secondary' onClick={onClickIcon}>
														Cancel
													</Button>&nbsp;
													<Button variant='primary' type='submit' >
														Save
													</Button>
                   							</div>
											
										</form>
								</div> }
							</Card.Header>
							<Card.Header className='bg-white oncardHeaderHover'  >
								{onClickLeavesCountCondition ? <div className='row'>
									
									<div className='col-md-4'>
										<p className='fw-bold'>Leaves Count</p>
									</div>
									<div className='col-md-8'>
										<div className=" mb-3 row">
											<div className=" col-md-4"><span className='fw-bold'> Leaves Allowed in a Year </span> <p className=''>18.0</p></div>
											<div className="col-md-4"><span className='fw-bold'> Weekends Between Leave </span> <p className=''>18.0</p></div>
											<div  className="col-md-4 text-end
											icontoShow fw-bold " onClick={onClickLeavesCount} ><GrEdit/></div>
										</div>
										<div className='row'>
											<div className="col-md-4"><span className='fw-bold'> Holidays Between Leave </span> <p className=''>18.0</p></div>
											<div className='col-md-8'></div>
										</div>
											
										
									</div>
								</div> : 
								<div>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className='row'>
											<div className='col-md-4'>
												<p className='fw-bold'>Leaves Count</p>
											</div>
											<div className='col-md-8'>
												<div className=" mb-3 row">
													<div className=" col-md-6">
														<label className='fw-bold' >Name</label >
														<div className=''>
															<input
																className="form-control"
																type="text"
																maxLength={20}
																{...register('Name', {
																required: 'Please enter name',

																pattern: {
																	value: /^[a-zA-Z\s]+$/,
																	message: 'Please enter valid name',
																},
																pattern: {
																	value: /^[^.\s]/,
																	message: 'first character space not allowed ',
																},
																})}
																onKeyUp={() => {
																trigger('Name')
																}}
															/>
															<p className="text-start">
																{errors.Name && (
																<span className="text-danger ">
																	{errors.Name.message}
																</span>
																)}
															</p>
														</div>
													</div>
													<div className="col-md-6">
														<label className='fw-bold' for='paddress'> Weekends Between Leave </label>
															<div>
																<input
																type='checkbox'
																id='paddress'
																	{...register("parmanentAddress")}
																/>
															</div>
													</div>
													
												</div>
												<div className="row">
													<label className='fw-bold' for='paddress'> Holidays Between Leave </label>
													<div>
														<input
														type='checkbox'
														id='paddress'
															{...register("parmanentAddressd")}
														/>
													</div>
												</div>
													
												
											</div>
										</div>
										 <div className="text-right">
											<Button variant='secondary' onClick={onClickLeavesCount}>
												Cancel
											</Button>&nbsp;
											<Button variant='primary' type='submit' >
												Save
											</Button>
                   						</div>
									</form>
								</div> }
							</Card.Header>
							<Card.Header className='bg-white oncardHeaderHover'  >
								{onClickAccrualCondition ? <div className='row'>
									
									<div className='col-md-4'>
										<p className='fw-bold'>Accrual</p>
									</div>
									<div className='col-md-8'>
										<div className=" mb-3 row">
											<div className=" col-md-4"><span className='fw-bold'> Creditable On Accrual Basis </span> <p className=''>18.0</p></div>
											<div className="col-md-4"><span className='fw-bold'> Accrual Frequency </span> <p className=''>18.0</p></div>
											{/* <div  className="col-md-4 text-end
											icontoShow fw-bold " onClick={onClickAccrual} ><GrEdit/></div> */}
										</div>
										<div className='row'>
											<div className="col-md-4"><span className='fw-bold'> Accrual Period </span> <p className=''>18.0</p></div>
											<div className='col-md-8'></div>
										</div>
											
										
									</div>
								</div> : <></>
								// <div>
								// 	<div>
								// 		<p className='fw-bold'>Description</p>
								// 		<p>like name</p>
								// 	</div>
								// 	<div>
								// 		<button className='fw-bold btn btn-primary'  onClick={onClickAccrual} >Cancel</button>
										
								// 	</div>
								// </div> 
							}
							</Card.Header>
							<Card.Header className='bg-white oncardHeaderHover'  >
								{onClickApplicabilityCondition ? <div className='row'>
									
									<div className='col-md-4'>
										<p className='fw-bold'>Applicability</p>
									</div>
									<div className='col-md-8'>
										<div className=" mb-3 row">
											<div className=" col-md-4"><span className='fw-bold'> Allowed under Probation </span> <p className=''>18.0</p></div>
											<div  className="col-md-8 text-end
											icontoShow fw-bold " onClick={onClickApplicability} ><GrEdit/></div>
										</div>
									</div>
								</div> : 
								<div className='row'>
									<div className='col-md-4'>
										<p className='fw-bold'>Applicability</p>
									</div>
									<div className='col-md-8'>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="">
												<input
												type='checkbox'
												id='paddress'
													{...register("parmanentAddressd")}
													className='mr-2'
												/>
												<label className='fw-bold' for='paddress'> Allowed under Probation </label>
										</div>
										<div className="text-right">
												<Button variant='secondary' onClick={onClickApplicability}>
													Cancel
												</Button>&nbsp;
												<Button variant='primary' type='submit' >
													Save
												</Button>
										</div>
									</form></div>
								</div> }
							</Card.Header>
							<Card.Header className='bg-white oncardHeaderHover'  >
								{onClickCarryForwardCondition ? <div className='row'>
									
									<div className='col-md-4'>
										<p className='fw-bold'>Carry Forward</p>
									</div>
									<div className='col-md-8'>
										<div className=" mb-3 row">
											<div className=" col-md-4"><span className='fw-bold'> Carry Forward Enabled </span> <p className=''>18.0</p></div>
											<div  className="col-md-8 text-end
											icontoShow fw-bold " onClick={onClickCarryForward} ><GrEdit/></div>
										</div>
									</div>
								</div> : 
							    <div className='row'>
									<div className='col-md-4'>
										<p className='fw-bold'>Carry Forward</p>
									</div>
									<div className='col-md-8'>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="">
												<input
												type='checkbox'
												id='paddress'
													{...register("parmanentAddressd")}
													className='mr-2'
												/>
												<label className='fw-bold' for='paddress'> Carry Forward Enabled </label>
										</div>
										<div className="text-right">
												<Button variant='secondary' onClick={onClickCarryForward}>
													Cancel
												</Button>&nbsp;
												<Button variant='primary' type='submit' >
													Save
												</Button>
										</div>
									</form></div>
								</div> }
							</Card.Header>
							
					
				        </Card>
			 </div>
		</div>
		
	  </div>
    </>
  )
}

export default LeaveRules
