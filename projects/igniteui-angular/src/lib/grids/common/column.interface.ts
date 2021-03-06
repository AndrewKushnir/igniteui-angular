import { TemplateRef } from '@angular/core';
import { DataType } from '../../data-operations/data-util';
import { ISortingStrategy } from '../../data-operations/sorting-strategy';
import { FilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';

/**
 * @hidden
 * @internal
 */
export interface ColumnType {
    field: string;
    index: number;
    dataType: DataType;
    inlineEditorTemplate: TemplateRef<any>;
    visibleIndex: number;
    editable: boolean;
    resizable: boolean;
    searchable: boolean;
    columnGroup: boolean;
    movable: boolean;
    groupable: boolean;
    sortable: boolean;
    filterable: boolean;
    hidden: boolean;
    disablePinning: boolean;
    sortStrategy: ISortingStrategy;
    filteringIgnoreCase: boolean;
    filteringExpressionsTree: FilteringExpressionsTree;
    hasSummary: boolean;
    summaries: any;
    pinned: boolean;
    selected: boolean;
    selectable: boolean;
    level: number;
    rowStart: number;
    rowEnd: number;
    colStart: number;
    colEnd: number;
    gridRowSpan: number;
    gridColumnSpan: number;
    columnLayoutChild: boolean;
    width: string;
    topLevelParent?: ColumnType;
    parent?: ColumnType;
    hasLastPinnedChildColumn: boolean;
    getGridTemplate(isRow: boolean, isIE: boolean): string;
}
