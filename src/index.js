import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StepMaster from './components/StepMaster';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<StepMaster />
	</React.StrictMode>,
);

reportWebVitals();
