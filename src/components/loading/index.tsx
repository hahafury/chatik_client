import React from "react";
import {loadingSvg} from "../../constants";
import styles from "./loading.module.sass";

const Loading: React.FC = (): React.ReactElement => {
	return (
		<div className={styles.loading}>
			<img src={loadingSvg} loading="lazy" alt="loading"/>
		</div>
	);
};

export default Loading;