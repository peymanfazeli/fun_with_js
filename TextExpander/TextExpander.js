import React, { Children, useState } from 'react'

export default function TextExpander({
	collapsedNumWords=20,
	epxandButtonText='show less',
	collapseButtonText='show more',
	buttonColor='#ff6622',
	className='',
	children

}) {
	console.log('class name is ', className);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const handleOnClick = () => {
		setIsCollapsed(!isCollapsed)
	}
	function setCollapsedText(text) {
		return text.split(' ').slice(0, collapsedNumWords).join(' ') + "..."
	}
	return (
		<div>
			<div className={className}>
				{isCollapsed ? setCollapsedText(children) : children}					
			</div>
			<button
				onClick={handleOnClick}
				style={{
					backgroundColor: buttonColor,
					color: 'white',
					padding: '5px 10px',
					border: 'none',
					borderRadius: '5px',
					cursor: 'pointer'
				}}
			>
				{isCollapsed ? collapseButtonText : epxandButtonText}
			</button>
		</div>

	)
}
