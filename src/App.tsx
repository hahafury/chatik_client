import Wrapper from './components/wrapper';
import {GlobalStyle} from './styles/GlobalStyle';
import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import useModal from "./hooks/useModal";

const App: React.FC = (): React.ReactElement => {
	const {modalStyles, modal} = useModal();
	const [modalCustomStyle] = modalStyles;
	const [modalContent, setModalContent] = modal;

	return (
		<HashRouter>
			<Modal
				isOpen={!!modalContent}
				onRequestClose={() => setModalContent(null)}
				style={modalCustomStyle}
			>
				{modalContent}
			</Modal>
			<ToastContainer
				position="bottom-left"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={4}
			/>
			<GlobalStyle/>
			<Routes>
				<Route path="/" element={<Wrapper/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/signup" element={<RegistrationPage/>}/>
			</Routes>
		</HashRouter>
	);
};

export default App;