import * as React from 'react';

import UpCheckbox from '../../../Inputs/Checkbox/UpCheckBox';

import UpDataGridCellHeader from '../UpDataGridCellHeader/UpDataGridCellHeader';
import { Column, Action, SortDirection } from '../UpDataGrid/UpDataGrid.types';
import { ActionFactory } from '../UpDataGridRow/UpDataGridRow';
import { isActionEnabled } from '../helper';

export interface UpDataGridRowHeaderState {
  isSelected: boolean;
  columns: Array<Column>;
}

export interface UpDataGridRowHeaderProps {
  columns: Array<Column>;
  isSelectionEnabled: boolean;
  actions: ActionFactory<any> | Array<Action>;
  onSortChange?: (c: Column, d: SortDirection) => void;
  onSelectionChange?: (isSelected: boolean) => void;
  displayRowActionsWithinCell?: boolean;
  textAlignCells?: 'center' | 'left' | 'right' | 'initial';
  isAllDataChecked?: boolean;
  isSelectionAllEnabled?: boolean;
}

export default class UpDataGridRowHeader extends React.Component<UpDataGridRowHeaderProps, UpDataGridRowHeaderState> {
  static defaultProps: UpDataGridRowHeaderProps = {
    isSelectionEnabled: true,
    columns: [],
    actions: null,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSelected: false,
      columns: this.props.columns,
    };
  }

  onSelectionChange = (event, isSelected) => {
    if (this.props.onSelectionChange) this.props.onSelectionChange(isSelected);
  };

  onSortChange = (c: Column, dir: SortDirection) => {
    // Update the column state
    const columns: Array<Column> = [];
    const sortedColumn = c;
    sortedColumn.sortDir = dir;

    this.state.columns.map((value, index) => {
      value.isSorted = c.field == value.field;
      if (value.isSorted) value.sortDir = dir;
      else value.sortDir = null;

      columns.push(value);
    });

    this.setState({ columns: columns }, () => {
      if (this.props.onSortChange) this.props.onSortChange(sortedColumn, dir);
    });
  };

  componentWillReceiveProps(nextProps: UpDataGridRowHeaderProps) {
    // Refresh the columns
    this.setState({
      isSelected: false,
      columns: nextProps.columns,
    });
  }

  render() {
    const selection = (
      <UpCheckbox
        options={[
          {
            checked: this.props.isAllDataChecked,
            name: '',
            value: '',
            onOptionChange: this.onSelectionChange,
            ...(!this.props.isSelectionAllEnabled && {
              disabled: true,
            }),
          },
        ]}
      />
    );

    return (
      <thead className="up-data-grid-header">
        <tr>
          {this.props.isSelectionEnabled && (
            <UpDataGridCellHeader
              key={`header-selection`}
              className="up-data-grid-header-cell-selection"
              column={{
                label: selection,
                isSortable: false,
              }}
              textAlignCells={this.props.textAlignCells}
              width={''}
            />
          )}
          {this.props.columns.map((value, index) => {
            return (
              <UpDataGridCellHeader
                key={`header-${index}`}
                onSortChange={this.onSortChange.bind(this)}
                column={value}
                textAlignCells={this.props.textAlignCells}
              />
            );
          })}
          {isActionEnabled(this.props) && (
            <UpDataGridCellHeader
              key={`header-actions`}
              width={`${this.props.actions.length * 46}px`}
              column={{ label: '', isSortable: false }}
              textAlignCells={this.props.textAlignCells}
            />
          )}
        </tr>
      </thead>
    );
  }
}
