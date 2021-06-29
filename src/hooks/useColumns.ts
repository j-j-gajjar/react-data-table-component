import * as React from 'react';
import { decorateColumns, findColumnIndexById } from '../DataTable/util';
import { TableColumn } from '../DataTable/types';

function useColumns<T>(columns: TableColumn<T>[]) {
	// decorate columns with additional metadata required by RDT
	const columnsMemo = React.useMemo(() => decorateColumns(columns), [columns]);

	const [cols, setCols] = React.useState(columnsMemo);
	const [dragOver, setDragOver] = React.useState(-1);

	const selectedColIndex = React.useRef(-1);
	const targetColId = React.useRef(-1);

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		const { id } = e.target as HTMLDivElement;

		// e.dataTransfer.setData('selectedColIndex', id);
		selectedColIndex.current = findColumnIndexById(columnsMemo, id);
		// console.log(selectedColIndex.curren);
		setDragOver(selectedColIndex.current);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		// e.stopPropagation();
		// e.preventDefault();

		const { id } = e.target as HTMLDivElement;
		const targetColId = parseInt(id);

		// console.log(id);
		if (targetColId > -1) {
			const targetColIndex = findColumnIndexById(columnsMemo, targetColId);

			if (targetColIndex !== selectedColIndex.current) {
				const reorderedCols = [...columnsMemo];

				// console.log(targetColId.current, selectedColIndex.current, targetColIndex);

				reorderedCols[selectedColIndex.current] = columnsMemo[targetColIndex];
				reorderedCols[targetColIndex] = columnsMemo[selectedColIndex.current];

				// setCols(reorderedCols);
			}
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		const { id } = e.target as HTMLDivElement;
		// console.log(id);
		targetColId.current = parseInt(id);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		// e.preventDefault();
		// e.stopPropagation();
	};

	return { cols, dragOver, handleDragStart, handleDragEnter, handleDragOver, handleDragLeave };
}

export default useColumns;
