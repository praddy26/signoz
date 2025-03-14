import styled from 'styled-components';

const SPAN_HEIGHT = 10;
const SPAN_V_PADDING = 1;
export const TOTAL_SPAN_HEIGHT = SPAN_HEIGHT + 2 * SPAN_V_PADDING;

/**
 * An individual span for traces flame graph
 */
export const SpanItemContainer = styled.div<{
	topOffset: number;
	leftOffset: number;
	width: number;
	spanColor: string;
	selected: boolean;
	zIdx: number;
}>`
	position: absolute;
	top: ${(props) => props.topOffset}px;
	left: ${(props) => props.leftOffset}%;
	width: ${(props) => props.width}%;
	height: ${SPAN_HEIGHT}px;
	margin: ${SPAN_V_PADDING}px 0;
	background-color: ${({ spanColor }) => spanColor};
	border-radius: ${SPAN_HEIGHT / 2}px;
	z-index: ${(props) => props.zIdx};
`;

/**
 * Container for spans, for traces flame graph.
 */
export const TraceFlameGraphContainer = styled.div<{
	height: number;
}>`
	position: relative;
	width: 100%;
	height: ${({ height }) => (height ? height : 120)}px;
`;
