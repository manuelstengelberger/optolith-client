import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import * as React from 'react';
import createOverlay, { close } from '../utils/createOverlay';
import Overlay from './Overlay';

interface Props {
	content: React.ReactNode;
	margin?: number;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

interface State {
	isDisplayed: boolean;
}

export default class Tooltip extends Component<Props, State> {

	static propTypes = {
		content: PropTypes.node,
		margin: PropTypes.number,
		position: PropTypes.string
	};

	static defaultProps = {
		position: 'top'
	};

	state = {
		isDisplayed: false
	};

	triggerRef: Element;
	node: HTMLDivElement | undefined;

	componentWillUnmount() {
		if (this.node) {
			close(this.node);
		}
	}

	open = () => {
		const { content, margin, position = 'top' } = this.props;
		this.node = createOverlay(<Overlay className="tooltip" position={position} trigger={this.triggerRef} margin={margin}>
			{content}
		</Overlay>);
	}
	close = () => {
		close(this.node!);
		this.node = undefined;
	}

	render() {

		const { children } = this.props;

		const only = React.cloneElement(React.Children.only(children), {
			onMouseOver: this.open,
			onMouseOut: this.close,
			ref: (node: HTMLDivElement) => {
				if (node !== null && node.nodeType !== 1) {
					this.triggerRef = findDOMNode(node);
				}
				else {
					this.triggerRef = node;
				}
			}
		});

		return only;
	}
}