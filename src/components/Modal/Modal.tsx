import React, { Fragment } from "react";
import styles from "./Modal.module.css";

type ModalType = {
	isOpen: boolean;
	toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ isOpen, toggleModal }: ModalType) {
	return isOpen ? (
		<Fragment>
			<div
				className={styles.overlay}
				onClick={() => {
					toggleModal(false);
				}}
			/>
			<div className={styles.modal}>
				<h3 className={styles.modal_title}>title</h3>
				{/* <h3>{title}</h3> */}
				<div className={styles.modal_inner}>children</div>
			</div>
		</Fragment>
	) : null;
}

export default Modal;
