import React, { useState } from 'react';
import { TextField, Switch} from '@mui/material';
import Typography from '@mui/material/Typography';
import '../scss/app.scss';
import newIcon1 from '../images/icon_1.png';
import newIcon2 from '../images/icon_2.png';
import newIcon3 from '../images/icon_3.png';

const StepMaster = () => {
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [phoneError, setPhoneError] = useState('');

	const [formData, setFormData] = useState({
		step: 1,
		selectedPlan: null,
		name: '',
		email: '',
		phone: '',
		nameError: '',
		emailError: '',
		phoneError: '',
		yearlyBilling: false,
	  });

	const plans = [
		{ icon: newIcon1, name: 'Arcade', price: 9 },
		{ icon: newIcon2, name: 'Advanced', price: 12 },
		{ icon: newIcon3, name: 'Pro', price: 15 },
	];

    const handleNextStep = () => {
		if (formData.step < 4) {
		  if (formData.step === 1) {
			const isValid = validateStepOne();
			if (!isValid) return;
		  }
		  console.log(formData); 
		  setFormData((prevData) => ({ ...prevData, step: prevData.step + 1 }));
		}
	  };

	  const handlePreviousStep = () => {
		if (formData.step > 1) {
		  setFormData((prevData) => ({ ...prevData, step: prevData.step - 1 }));
		}
	  };

	const validateStepOne = () => {
		let isValid = true;

		if (formData.name.trim() === '') {
			setNameError('Name is required');
			isValid = false;
		} else {
			setNameError('');
		}

		if (formData.email.trim() === '') {
			setEmailError('Email Address is required');
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			setEmailError('Invalid email format');
			isValid = false;
		} else {
			setEmailError('');
		}

		if (formData.phone.trim() === '') {
			setPhoneError('Phone Number is required');
			isValid = false;
		} else {
			setPhoneError('');
		}

		return isValid;
	};

	
	const handlePlanSelect = (planIndex) => {
		setFormData((prevData) => ({ ...prevData, selectedPlan: planIndex }));
	  };
	
	  const handleYearlyBillingChange = () => {
		setFormData((prevData) => ({ ...prevData, yearlyBilling: !prevData.yearlyBilling }));
	  };

	const renderStepContent = () => {
		switch (formData.step) {
			case 1:
				return (
					<div className='form-step-one'>
						<div className='form-group'>
							<label className='form-label-step-one'>Name</label>
							<TextField
								className='form-input-step-one'
								variant='outlined'
								placeholder='e.g. Stephen King'
								value={formData.name}
								onChange={e => setFormData(prevData => ({ ...prevData, name: e.target.value }))}
								error={Boolean(nameError)}
								helperText={nameError}
							/>
						</div>
						<div className='form-group'>
							<label className='form-label-step-two'>Email Address</label>
							<TextField
								className='form-input-step-two'
								variant='outlined'
								placeholder='e.g. stephenking@lorem.com'
								value={formData.email}
								onChange={e => setFormData(prevData => ({ ...prevData, email: e.target.value }))}
								error={Boolean(emailError)}
								helperText={emailError}
							/>
						</div>
						<div className='form-group'>
							<label className='form-label-step-three'>Phone Number</label>
							<TextField
								className='form-input-step-three'
								variant='outlined'
								placeholder='e.g. +1 234 567 890'
								value={formData.phone}
								onChange={e => setFormData(prevData => ({ ...prevData, phone: e.target.value }))}
								error={Boolean(phoneError)}
								helperText={phoneError}
							/>
						</div>
					</div>
				);
			case 2:
				// Contenido del paso 2
				return (
					<div className='step-two-formulario-container'>
						<div className='step-two-plan-container'>
							{plans.map((plan, index) => (
								<div
									key={index}
									onClick={() => handlePlanSelect(index)}
									className={`step-two-plan-box ${
										formData.selectedPlan === index ? 'selected' : ''
									}`}
								>
									<div
										className='step-two-icon'
										style={{ backgroundImage: `url(${plan.icon})` }}
									/>
									<Typography
										className='step-two-plan-title'
									>
										{plan.name}
									</Typography>
									<Typography variant='body2' className='step-two-plan-price'>
										${plan.price}/mo
									</Typography>
								</div>
							))}
						</div>
						<div className='step-two-switch-container'>
							<div className='switchStyle'>
								<label className='labelStyle monthlyLabel'>Monthly</label>
								<Switch
								checked={formData.yearlyBilling}
								onChange={handleYearlyBillingChange}
              />
								<label className='labelStyle yearlyLabel'>Yearly</label>
							</div>
						</div>
					</div>
				);
			case 3:
				// Contenido del paso 3
				return <div>Step Three Content</div>;
			case 4:
				// Contenido del paso 4
				return <div>Step Four Content</div>;
			default:
				return null;
		}
	};

	const stepTitle = [
		{
			title: 'Personal info',
			subtitle: 'Please provide your name, email address, and phone number.',
		},
		{
			title: 'Select your plan',
			subtitle: 'You have the option of monthly or yearly billing.',
		},
		{
			title: 'Pick add-ons',
			subtitle: 'Add-ons help enhance your gaming experience.',
		},
		{
			title: 'Finishing up',
			subtitle: 'Double-check everything looks OK before confirming.',
		},
	];

	const stepInfo = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'];

	const currentTitle = stepTitle[formData.step - 1];

	return (
		<div className='container'>
			<div className='panel'>
				<div className='left-column'>
					<div className='step-items'>
						{[1, 2, 3, 4].map((number, index) => (
							<div key={number} className='step-item'>
								<div
									className={`step-circle ${formData.step === number ? 'selected' : ''}`}
								>
									{number}
								</div>
								<div className='step-label'>
									<Typography variant='subtitle2' className='step-title'>
										Step {number}
									</Typography>
									<Typography className='step-subtitle'>
										{stepInfo[index]}
									</Typography>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='right-column'>
					<div className='current-step'>
						<h2 className='step-title'>{currentTitle ? currentTitle.title : ''}</h2>
  						<p className='step-subtitle'>{currentTitle ? currentTitle.subtitle : ''}</p>
						{renderStepContent()}
					</div>
					<div className='step-buttons'>
						{formData.step > 1 && (
							<div className='go-back-button' onClick={handlePreviousStep}>
								Go Back
							</div>
						)}
						{formData.step < 4 && (
							<div className='step-button' onClick={handleNextStep}>
								Next Step
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepMaster;