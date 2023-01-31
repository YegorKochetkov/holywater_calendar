import React, { type ReactNode, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";

type ModalPropsType = {
	children: ReactNode;
	onClose: () => void;
};
function Modal({ children, onClose }: ModalPropsType) {
	const navigate = useNavigate();

	const handleKeyEsc = (key: string) => {
		if (key === "Escape") {
			onClose();
			navigate(-1);
		}
	};

	const handleOverlayClick = () => {
		onClose();
		navigate(-1);
	};

	return (
		<Fragment>
			<div className={styles.overlay} onClick={() => handleOverlayClick()} />
			<div
				className={styles.modal}
				onKeyDown={(event) => handleKeyEsc(event.key)}
			>
				{children}
			</div>
		</Fragment>
	);
}

export default Modal;
