import styles from '../styles/Navbar.module.css';

export default function Navbar() {
	return (
		<>
		  <nav className={ styles['navbar'] }>
		    <h3 className={ styles['project-title'] }>CyberMARS</h3>
		    <div className={ styles['spacer'] }></div>
		  </nav>
		</>
	);
};
