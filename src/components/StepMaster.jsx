// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import '../scss/app.scss';
// import { urlFrostings } from '../endpoints';
// import axios from 'axios';
import leftColumnBackgroundImageOne from '../images/background-torta1.png';
import leftColumnBackgroundLogo from '../images/Mis_pastelitos_Bogota_Logo.png';
import Fondant from '../images/Fondant.png';
import Crema from '../images/Crema.png';
import Ganache from '../images/Ganache.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const StepMaster = () => {
	const [selectedFrosting, setSelectedFrosting] = useState(null);
	const [formData, setFormData] = useState({
		step: 1,
		selectedFrosting: null,
	});

	const stepTitle = [
		{
			title: 'Seleccione Masa',
			subtitle: 'Seleccione un tipo de masa para la torta.',
		},
		{
			title: 'Seleccione un Relleno',
			subtitle: 'Seleccione un tipo de relleno para la torta.',
		},
		{
			title: 'Seleccione una Cobertura',
			subtitle: 'Seleccione un tipo de cobertura para la torta.',
		},
		{
			title: 'Seleccione la Cantidad de Porciones',
			subtitle: 'Seleccione la cantidad de porciones que tendrá la torta.',
		},
	];

	const currentTitle = stepTitle[formData.step - 1];

	const frostingsJson = [
		{ icon: Crema, frostingName: 'Crema', price: 1000 },
		{ icon: Ganache, frostingName: 'Ganache', price: 1000 },
		{ icon: Fondant, frostingName: 'Fondant', price: 2100 },
	];

	const handleNextStep = () => {
		if (formData.step <= 5) {
			if (formData.step === 1) {
				const isValid = validateStepOne();
				if (!isValid) return;
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
		// let isValid = true;

		return true;
	};

	// useEffect(() => {
	//	fetchFrostings(); // Llamar a la función fetchData desde useEffect
	// }, []);

	// const fetchFrostings = async () => {
	//		try {
	//		const response = await axios.get(urlFrostings);
	//		console.log(response);
	//		setFrostings(response.data); // Actualizar el estado con los datos obtenidos
	//	} catch (error) {
	//		console.error('Error al obtener los datos:', error);
	//	}
	// };

	const renderItems = () => {
		const itemsPerSlide = 2; // Define cuántos elementos por slide deseas mostrar
		const slides = [];

		for (let i = 0; i < frostingsJson.length; i += itemsPerSlide) {
			const slideItems = frostingsJson.slice(i, i + itemsPerSlide);
			const slideContent = slideItems.map((frosting, index) => (
				<div 	key={index} className='carousel-item'>
					<div
						key={index}
						className={`step-one-box ${
							selectedFrosting === index ? 'selected' : ''
						}`}
						onClick={() => setSelectedFrosting(index)}
					>
						<div
							className='step-two-icon'
							style={{ backgroundImage: `url(${frosting.icon})` }}
						/>
						<div className='step-two-plan-info'>
							<Typography className='step-two-plan-title'>
								{frosting.frostingName}{' '}
							</Typography>
							<Typography variant='body2' className='step-two-plan-price'>
								${frosting.price}{' '}
							</Typography>
						</div>
					</div>
				</div>
			));

			slides.push(
				<div key={i} className='carousel-slide'>
					{slideContent}
				</div>,
			);
		}

		return slides;
	};

	const renderStepContent = () => {
		return (
			<div className='step-two-form-container'>
				<div className='step-two-plan-container'>
					<Carousel showThumbs={false} showIndicators={false}>
						{renderItems()}
					</Carousel>
				</div>
			</div>
		);
	};

	// Resto del código del componente...

	return (
		<div className='container full-height'>
			<div className='panel-container'>
				<div className='left-column'>
					<div
						className='image-background-logo'
						style={{ backgroundImage: `url(${leftColumnBackgroundLogo})` }}
					></div>
					<div
						className='image-background-one'
						style={{ backgroundImage: `url(${leftColumnBackgroundImageOne})` }}
					></div>
					<div className='image-overlay'></div>
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
								Confirm
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
