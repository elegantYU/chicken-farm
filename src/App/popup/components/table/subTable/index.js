import React, { useEffect, useState } from "react";
import { Wrapper, Table, Tr, Th } from "./index.style";
import Cell from "../cell";
import SortIcon from "../sort";

const SubTable = (props) => {
	const {
		head,
		position,
		data,
		theme,
		hoverEvent,
		leaveEvent,
		clickEvent,
		blurEvent,
		delEvent,
		activeIndex,
	} = props;
	const isFixClass = position ? position : "";

	let blankOffsetLeft = 0;
	let blankOffsetRight = 0;

	if (!isFixClass) {
		blankOffsetLeft = head.reduce(
			(sum, { width, position }) => (position === "left" ? sum + width : sum),
			0
		);
	}

	// 生成表的数据
	const headData = isFixClass ? head : head.filter(({ position }) => !position);
	const totalWidth = headData.reduce((sum, { width }) => sum + width, 0); //  计算总宽度
	const fieldData = headData.map(({ dataIndex, textAlign, tag, input, keyword, sort }) => ({
		dataIndex,
		textAlign,
		tag,
		input,
		keyword,
		sort,
	}));

	// 遍历出当前表所需数据 [{ active, list:[] }]
	const bodyData = data.map((item, idx) => {
		const resList = fieldData.reduce((arr, { dataIndex, textAlign, tag, input, keyword, sort }) => {
			const tdConfig = {
				key: dataIndex,
				field: item[dataIndex],
				textAlign,
				tag,
				input,
				keyword,
				sort,
			};
			arr.push(tdConfig);
			return arr;
		}, []);
		const resData = {
			list: resList,
			active: activeIndex !== null && idx === activeIndex, //  hover状态
		};

		return resData;
	});

	return (
		<Wrapper
			theme={theme}
			className={isFixClass}
			style={{ width: `${totalWidth + blankOffsetLeft + blankOffsetRight}px` }}
		>
			{/* {!!blankOffsetLeft && <div style={{ width: `${blankOffsetLeft}px` }}></div>} */}
			<Table style={{ width: `${totalWidth}px` }} theme={theme} className="rightBorder">
				<thead>
					<Tr theme={theme}>
						{headData.map(({ title, key, width, textAlign, sort }) => (
							<Th theme={theme} key={key} style={{ width: `${width}px`, textAlign }}>
								{title}
								{sort && <SortIcon theme={theme} dataKey={key} />}
							</Th>
						))}
					</Tr>
				</thead>
				<tbody>
					{bodyData.map(({ list, active }, i) => (
						<Tr
							key={list}
							theme={theme}
							className={active && "active"}
							onMouseEnter={() => hoverEvent(i)}
							onMouseLeave={leaveEvent}
							onClick={() => clickEvent(i)}
						>
							{list.map(({ field, textAlign, tag, input, keyword, key }) => (
								<Cell
									tag={tag}
									input={input}
									theme={theme}
									field={field}
									active={active}
									key={key}
									code={list.find(({ key }) => key === "code")}
									dataKey={key}
									textAlign={textAlign}
									keyword={keyword}
									rowIndex={i}
									blurEvent={blurEvent}
									delEvent={() => delEvent(i)}
								/>
							))}
						</Tr>
					))}
				</tbody>
			</Table>
		</Wrapper>
	);
};

export default SubTable;