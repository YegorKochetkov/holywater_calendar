import React, { type ReactNode, Fragment } from "react";
import styles from "./Modal.module.css";

type ModalPropsType = {
	children: ReactNode;
	onClose: () => void;
};
function Modal({ children, onClose }: ModalPropsType) {
	const handleKeyEsc = (key: string) => {
		if (key === "Escape") {
			onClose();
		}
	};

	return (
		<Fragment>
			<div className={styles.overlay} onClick={onClose} />
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
