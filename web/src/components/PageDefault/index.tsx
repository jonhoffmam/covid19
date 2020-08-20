import React from 'react';
// import Menu from '../Menu';
import Footer from '../Footer';

const PageDefault = (props: any) => {
	const {children} = props;
	
	return (
		<>
			{/* <Menu /> */}
				{children}				
			<Footer />			
		</>
	);
}

export default PageDefault;