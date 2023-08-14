import React, { useState } from 'react';
import { TextField, Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import '../scss/app.scss';
import Arcade from '../images/Arcade.png';
import Advanced from '../images/Advanced.png';
import Pro from '../images/Pro.png';

const StepMaster = () => {
	const [addOnsError, setAddOnsError] = useState('');
	const [plansError, setPlansError] = useState('');
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
		selectedAddOns: [],
	});

	const plans = [
		{ icon: Arcade, name: 'Arcade', price: 9 },
		{ icon: Advanced, name: 'Advanced', price: 12 },
		{ icon: Pro, name: 'Pro', price: 15 },
	];

	const picksAddOns = [
		{
			title: 'Online service',
			subtitle: 'Access to multiplayer games',
			price: 1,
		},
		{
			title: 'Larger storage',
			subtitle: 'Extra 1TB of cloud save',
			price: 2,
		},
		{
			title: 'Customizable Profile',
			subtitle: 'Custom theme on your profile',
			price: 2,
		},
	];

	const handleNextStep = () => {
		if (formData.step <= 5) {
			if (formData.step === 1) {
				const isValid = validateStepOne();
				if (!isValid) return;
			} else if (formData.step === 2) {
				const arePlansSelected = formData.selectedPlan;
				if (arePlansSelected == null) {
					setPlansError('Please select at least one plan');
					return;
				} else {
					setPlansError('');
				}
			} else if (formData.step === 3) {
				const areAddOnsSelected = selectedItems.length > 0;
				if (!areAddOnsSelected) {
					setAddOnsError('Please select at least one add-on');
					return;
				} else {
					setAddOnsError('');
				}
			}
			console.log(formData);
			setFormData(prevData => ({ ...prevData, step: prevData.step + 1 }));
		}
	};

	const handlePreviousStep = () => {
		if (formData.step > 1) {
			setFormData(prevData => ({ ...prevData, step: prevData.step - 1 }));
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

	const handlePlanSelect = planIndex => {
		setFormData(prevData => ({ ...prevData, selectedPlan: planIndex }));
	};

	const handleYearlyBillingChange = () => {
		setFormData(prevData => ({
			...prevData,
			yearlyBilling: !prevData.yearlyBilling,
		}));
	};

	const selectedPlan =
		formData.selectedPlan !== null ? plans[formData.selectedPlan] : null;

	const getTotalPrice = () => {
		const planPrice = selectedPlan ? selectedPlan.price : 0;
		const addOnsTotalPrice = formData.selectedAddOns.reduce(
			(total, addOnTitle) => {
				const addOn = picksAddOns.find(item => item.title === addOnTitle.title);

				if (addOn) {
					console.log(
						`Agregando complemento: ${addOn.title}, Precio: ${addOn.price}`,
					);
				} else {
					console.log(`Complemento no encontrado: ${addOnTitle}`);
				}

				return total + (addOn ? parseFloat(addOn.price) : 0);
			},
			0,
		);
		console.log(
			`Precio del Plan: ${planPrice}, Precio Total de Complementos: ${addOnsTotalPrice}`,
		);
		return planPrice + addOnsTotalPrice;
	};

	const renderAddOns = () => {
		return formData.selectedAddOns.map((addOnTitle, index) => {
			const addOn = picksAddOns.find(item => item.title === addOnTitle.title);
			return (
				<div key={index} className='addon-row'>
					<span className='addon-name'>{addOn.title}</span>
					<span className='addon-price'>+${addOn.price}/mo</span>
				</div>
			);
		});
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
								onChange={e =>
									setFormData(prevData => ({
										...prevData,
										name: e.target.value,
									}))
								}
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
								onChange={e =>
									setFormData(prevData => ({
										...prevData,
										email: e.target.value,
									}))
								}
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
								onChange={e =>
									setFormData(prevData => ({
										...prevData,
										phone: e.target.value,
									}))
								}
								error={Boolean(phoneError)}
								helperText={phoneError}
							/>
						</div>
					</div>
				);
			case 2:
				return (
					<div className='step-two-form-container'>
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
									 <div className='step-two-plan-info'>
									<Typography className='step-two-plan-title'>
										{plan.name}
									</Typography>
									<Typography variant='body2' className='step-two-plan-price'>
										${plan.price}/mo
									</Typography>
									</div>
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
						{plansError && <div className='error-message'>{plansError}</div>}
					</div>
				);
			case 3:
				return (
					<div className='step-three-container'>
						{picksAddOns.map((addOn, index) => (
							<label
								key={index}
								className={`step-three-panel ${
									selectedItems.includes(addOn.title)
										? ''
										: 'step-three-panel-unchecked'
								}`}
							>
								<input
									type='checkbox'
									className='step-three-checkbox'
									checked={selectedItems.includes(addOn.title)}
									onChange={() => handleCheckboxChange(addOn.title)}
								/>
								<div className='step-three-content'>
									<div className='step-three-title'>{addOn.title}</div>
									<div className='step-three-subtitle'>{addOn.subtitle}</div>
								</div>
								<div className='step-three-price'>${addOn.price}/mo</div>
							</label>
						))}
						{addOnsError && <div className='error-message'>{addOnsError}</div>}
					</div>
				);
			case 4:
				return (
					<div>
						<div className='form-data-detail'>
							<div className='detail-row'>
								<Typography className='value'>
									{selectedPlan ? selectedPlan.name : 'N/A'}
								</Typography>
								<Typography className='switch-value'>
									({formData.yearlyBilling ? 'Yearly' : 'Monthly'})
								</Typography>
								<Typography className='price'>
									{selectedPlan ? `+$${selectedPlan.price}` : ''}/mo
								</Typography>
							</div>
							<div className='addons-container'>{renderAddOns()}</div>
						</div>
						<div className='total-row'>
							<Typography variant='subtitle1' className='label'>
								Total (per month):
							</Typography>
							<Typography className='total-price'>
								+${getTotalPrice()}/mo
							</Typography>
						</div>
					</div>
				);
			case 5:
				return (
					<div className='step-five-container'>
							<div className='logo'></div>
							<div className='thank-you'>Thank you!</div>
							<div className='message'>
								Thanks for confirming your subscription! We hope you have fun
								using our platform. If you ever need support, please feel free
								to email us at support@loremgaming.com.
							</div>
					</div>
				);
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

	const [selectedItems, setSelectedItems] = useState([]);

	const toggleItem = title => {
		if (selectedItems.includes(title)) {
			setSelectedItems(selectedItems.filter(item => item !== title));
		} else {
			setSelectedItems([...selectedItems, title]);
		}
	};

	const handleCheckboxChange = title => {
		toggleItem(title);
	};

	const updateSelectedAddOns = () => {
		const selectedAddOns = picksAddOns.filter(addOn =>
			selectedItems.includes(addOn.title),
		);
		setFormData(prevData => ({ ...prevData, selectedAddOns }));
	};

	React.useEffect(() => {
		updateSelectedAddOns();
	}, [selectedItems]);

	return (
		<div className='container full-height'>
			<div className='panel'>
				<div className='left-column'>
					<div className='step-items'>
						{[1, 2, 3, 4].map((number, index) => (
							<div key={number} className='step-item'>
								<div
									className={`step-circle ${
										formData.step === number ? 'selected' : ''
									}`}
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
						<h2 className='step-title'>
							{currentTitle ? currentTitle.title : ''}
						</h2>
						<p className='step-subtitle'>
							{currentTitle ? currentTitle.subtitle : ''}
						</p>
						{renderStepContent()}
					</div>
					<div className='step-buttons'>
						{formData.step > 1 && formData.step < 5 && (
							<div className='go-back-button' onClick={handlePreviousStep}>
								Go Back
							</div>
						)}
						{formData.step === 4 ? (
							<div className='step-button-finished' onClick={handleNextStep}>
								Finalizar
							</div>
						) : (
							formData.step < 4 && (
								<div className='step-button' onClick={handleNextStep}>
									Next Step
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepMaster;
