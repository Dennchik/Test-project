import React, { useEffect, useState, useRef } from 'react';
// -----------------------------------------------------------------------------
import MainSlide from "./Mainslide.jsx";
// -----------------------------------------------------------------------------
const baseUrl = '.';
// -----------------------------------------------------------------------------
const Aboutpage = () => {
	return (
		<div className='page__main-content'>
			<div className="main-content" id='wrapper'>
				<div className="main-content__content" id='content'>
					<div className="main-content__slide">
						<h1 style={{ color: 'red', fontSize: '20px' }} ></h1>
					</div>
				</div>
			</div>
		</div>
	);
};
export { Aboutpage };