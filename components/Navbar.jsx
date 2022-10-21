import styles from '../styles/Navbar.module.css';

export default function Navbar() {
	return (
		<>
		  <nav className={ styles.navbar }>
		    <h1 className={ styles.projectTitle }>CyberMARS</h1>
		    <div className={ styles.spacer }></div>
		  </nav>
		</>
	);
};
