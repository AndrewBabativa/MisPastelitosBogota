// import React, { useState, useEffect } from 'react';
import React from 'react';
import Typography from '@mui/material/Typography';
import '../scss/app.scss';
// import { urlFrostings } from '../endpoints';
// import axios from 'axios';
import leftColumnBackgroundImageOne from '../images/background-torta1.png';
import leftColumnBackgroundLogo from '../images/Mis_pastelitos_Bogota_Logo.png';
import Fondant from '../images/Fondant.png';
import Crema from '../images/Crema.png';
import Ganache from '../images/Ganache.png';


const StepMaster = () => {
	// const [frostings, setFrostings] = useState([]); // Usar useState para almacenar los datos

	const frostingsJson = [
		{ icon: Crema, frostingName: 'Crema', price: 1000 },
		{ icon: Ganache, frostingName: 'Ganache', price: 1000 },
		{ icon: Fondant, frostingName: 'Fondant', price: 2100 },
	];

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

	const renderStepContent = () => {
		return (
			<div className='step-two-form-container'>
				<div className='step-two-plan-container'>
					{frostingsJson.map((frosting, index) => (
						<div key={index} className='step-two-plan-box'>
							{/* Asegúrate de ajustar las propiedades adecuadas para mostrar los datos */}
							<div
										className='step-two-icon'
										style={{ backgroundImage: `url(${frosting.icon})` }}
									/>
							<div className='step-two-plan-info'>
								<Typography className='step-two-plan-title'>
									{frosting.frostingName} {/* Ajustar esta propiedad según tus datos */}
								</Typography>
								<Typography variant='body2' className='step-two-plan-price'>
									${frosting.price}{' '}
									{/* Ajustar esta propiedad según tus datos */}
								</Typography>
							</div>
						</div>
					))}
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
				<h1 className='title-form'>Elige tu Cobertura</h1>
					{renderStepContent()}</div>
			</div>
		</div>
	);
};

export default StepMaster;
