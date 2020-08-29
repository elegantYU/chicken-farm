import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./index.style";
import Section from "./section/index";
import { getLargeCap } from "../../services/index";
import { requestRecursion } from "../../../../utils";
import { getLocal, setLocal } from "../../services/localStorage";
import Constants from "../../../../constants";

const SectionGroup = () => {
	const userConfig = getLocal(Constants.LOCAL_CONFIG);
	const [data, setData] = useState([]);
	const [type, setType] = useState(userConfig && userConfig.sectionView || 0);
	const theme = useSelector((state) => state.theme);
	const isMarketOpen = useSelector((state) => state.isMarketOpen);
	const intervalCheck = () => !isMarketOpen;

	useEffect(() => {
		requestRecursion({
			fns: getLargeCap,
			check: intervalCheck,
			time: 3000,
			callback: (originData) => {
				setData(originData);
			},
		});
	}, [isMarketOpen]);

	const changeType = () => {
		const num = type + 1 > 2 ? 0 : type + 1;
		setType(num);
		setLocal(Constants.LOCAL_CONFIG, { sectionView: num });
	};

	return (
		<Wrapper theme={theme}>
			{data.map((item) => (
				<Section data={item} key={item.name} theme={theme} clickEvent={changeType} type={type} />
			))}
		</Wrapper>
	);
};

export default SectionGroup;
