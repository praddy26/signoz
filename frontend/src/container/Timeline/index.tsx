import React, { useState, useMemo } from 'react';
import { isEqual } from 'lodash-es';
import styles from './style.module.css';
import { useMeasure } from 'react-use';
import { toFixed } from 'utils/toFixed';
import {
	INTERVAL_UNITS,
	resolveTimeFromInterval,
} from 'container/TraceDetail/utils';
import useThemeMode from 'hooks/useThemeMode';
import { Interval } from './types';
import { getIntervalSpread, getIntervals } from './utils';
interface TimelineProps {
	traceMetaData: object;
	globalTraceMetadata: object;
	intervalUnit: object;
	setIntervalUnit: Function;
}
const Timeline = ({
	traceMetaData,
	globalTraceMetadata,
	intervalUnit,
	setIntervalUnit,
}: TimelineProps) => {
	const [ref, { width }] = useMeasure<HTMLDivElement>();
	const { isDarkMode } = useThemeMode();

	const Timeline_Height = 22;
	const Timeline_H_Spacing = 0;

	const [intervals, setIntervals] = useState<Interval[] | null>(null);

	useMemo(() => {
		const {
			baseInterval,
			baseSpread,
			intervalSpreadNormalized,
		} = getIntervalSpread({
			globalTraceMetadata: globalTraceMetadata,
			localTraceMetaData: traceMetaData,
		});

		let intervalUnit = INTERVAL_UNITS[0];
		for (const idx in INTERVAL_UNITS) {
			const standard_interval = INTERVAL_UNITS[idx];
			if (baseSpread * standard_interval.multiplier < 1) {
				intervalUnit = INTERVAL_UNITS[idx - 1];
				break;
			}
		}

		setIntervalUnit(intervalUnit);
		setIntervals(
			getIntervals({
				baseInterval,
				baseSpread,
				intervalSpreadNormalized,
				intervalUnit,
			}),
		);
	}, [traceMetaData, globalTraceMetadata]);

	return (
		<div ref={ref} style={{ flex: 1, overflow: 'inherit' }}>
			<svg
				style={{ overflow: 'inherit' }}
				viewBox={`0 0 ${width} ${Timeline_Height}`}
				xmlns="http://www.w3.org/2000/svg"
				className={styles['svg-container']}
			>
				<line
					x1={Timeline_H_Spacing}
					y1={Timeline_Height}
					x2={width - Timeline_H_Spacing}
					y2={Timeline_Height}
					stroke={isDarkMode ? 'white' : 'black'}
					strokeWidth="1"
				/>
				{intervals &&
					intervals.map((interval, index) => (
						<g
							transform={`translate(${
								Timeline_H_Spacing +
								(interval.percentage * (width - 2 * Timeline_H_Spacing)) / 100
							},0)`}
							className={styles['timeline-tick']}
							key={interval.label + interval.percentage + index}
						>
							<text y={13} fill={isDarkMode ? 'white' : 'black'}>
								{interval.label}
							</text>
							<line
								y1={Timeline_Height - 5}
								y2={Timeline_Height + 0.5}
								stroke={isDarkMode ? 'white' : 'black'}
								strokeWidth="1"
							/>
						</g>
					))}
			</svg>
		</div>
	);
};

export default Timeline;
