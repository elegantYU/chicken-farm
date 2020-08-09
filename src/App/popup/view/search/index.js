/*
 * @Date: 2020-07-28 10:47:44
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-09 16:48:27
 * @Description: 搜索结果页
 */

import React, { useState, useEffect, useRef } from "react";
import {
	Wrapper,
	Mask,
	Content,
	CloseBtn,
	Title,
	ErrorPanel,
	ListWrapper,
	ListItem,
	BtnBox,
	Btn,
	Tips,
	LoadingWrapper,
} from "./index.style";
import { useSelector } from "react-redux";
import { updateSingleFund, addAllFunds } from "../../services";
import Loading from "../../components/loading";

const SearchPage = (props) => {
	const theme = useSelector((state) => state.theme);
	const isLoading = useSelector((state) => state.isSearchLoading);
	const { succ, fail } = useSelector((state) => state.searchData);
	const [listData, setListData] = useState([]);
	const { closeEvent, active } = props;
	const listWrapperRef = useRef(null);

	useEffect(() => {
		succ && setListData(succ.map((v) => ({ ...v, active: false })));
	}, [succ]);

	const addFund = (idx) => {
		const fundData = { ...listData[idx] };
		const param = {
			name: fundData.name,
			code: fundData.code,
			unit: 0,
			state: 1,
			create: Date.now(),
		};

		addAllFunds([param]);
		setListData(listData.map((v, i) => ({ ...v, active: i === idx ? !v.active : v.active })));
	};

	const addAllFundsData = () => {
		const data = listData
			.filter(({ active }) => !active)
			.map(({ name, code }) => ({
				name,
				code,
				unit: 0,
				state: 1,
				create: Date.now(),
			}));
		listData.forEach((v) => (v.active = true));
		addAllFunds(data).then((_) => closeEvent());
	};

	return (
		<Wrapper>
			<Mask onClick={closeEvent} className={!active && "cancel"}></Mask>
			<Content theme={theme} className={!active && "cancel"}>
				<CloseBtn className="iconfont chicken-close" theme={theme} onClick={closeEvent} />
				<Title theme={theme}>基金搜索:</Title>
				{/* 错误提示❌ */}
				{!isLoading && fail.length ? (
					<ErrorPanel theme={theme}>
						“{fail.join(",").length > 36 ? `${fail.join(",").substr(0, 33)}...` : fail.join(",")}
						”等，查不到对应数据，请确认后重试
					</ErrorPanel>
				) : null}
				{/* loading */}
				{isLoading ? (
					<LoadingWrapper>
						<Loading multi={2} />
					</LoadingWrapper>
				) : listData.length ? (
					<ListWrapper ref={listWrapperRef} className={fail.length && "isError"}>
						{listData.map(({ code, name, active }, i) => (
							<ListItem theme={theme} key={code}>
								<span>{code}</span>
								<span style={{ "text-align": "left" }}>{name}</span>
								<BtnBox>
									<Btn theme={theme} onClick={() => addFund(i)} className={active && "disabled"}>
										{active ? "已添加" : "添加"}
									</Btn>
								</BtnBox>
							</ListItem>
						))}
					</ListWrapper>
				) : (
					<LoadingWrapper theme={theme} className={fail.length && "isError"}>
						无查找结果
					</LoadingWrapper>
				)}
				<Tips theme={theme}>
					注: 已过滤格式错误基金代码
					{listData.length > 1 && (
						<Btn theme={theme} onClick={addAllFundsData}>
							全部添加
						</Btn>
					)}
				</Tips>
			</Content>
		</Wrapper>
	);
};

export default SearchPage;
