import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import '../scss/app.scss';

const StepMaster = () => {
	const [step, setStep] = useState(1);

	const handleNextStep = () => {
		if (step < 4) {
			setStep(prevStep => prevStep + 1);
		}
	};

	const handlePreviousStep = () => {
		if (step > 1) {
			setStep(prevStep => prevStep - 1);
		}
	};

	const stepInfo = [
		"YOUR INFO",
		"SELECT PLAN",
		"ADD-ONS",
		"SUMMARY"
	  ];

	return (
		<div className='container'>
			<div className='panel'>
				<div className='left-column'>
					<div className='step-items'>
						{[1, 2, 3, 4].map((number, index)  => (
							<div key={number} className='step-item'>
								<div
									className={`step-circle ${step === number ? 'selected' : ''}`}
								>
									{number}
								</div>
								<div className='step-label'>
									<Typography variant='subtitle2' className='step-title'>
										Step {number}
									</Typography>
									<Typography className='step-subtitle'>{stepInfo[index]}</Typography>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='right-column'>
					{/* Contenido de la columna derecha */}
					<div className='step-buttons'>
						{step > 1 && (
							<div className='go-back-button' onClick={handlePreviousStep}>
								Go Back
							</div>
						)}
						{step < 4 && (
							<div className='step-button' onClick={handleNextStep}>
								Next
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepMaster;
