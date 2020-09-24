import React from 'react';
import { Tooltip, Table, Button, Input, Space, DatePicker, Select, InputNumber, Form } from 'antd';
import { Resizable } from 'react-resizable';
import Popup from './Popup';
import { SearchOutlined, CloseOutlined, CheckSquareOutlined, BorderOutlined, FilterFilled, FileDoneOutlined, FileExcelOutlined } from '@ant-design/icons';
import * as Constant from '../../utility/Constant';
import * as common from '../../utility/common';

const { RangePicker } = DatePicker;
const { Option } = Select;

var showContextMenu = false;
var popupWidth = 0;
var popupHeight = 0;
const EditableCell = ({
    editing,
    dataIndex,
    title,
    datatype,
    record,
    index,
    children,
    cellValueChange,
    required,
    memberkey,
    valuekey,
    datasource,
    ...restProps
}) => {
    const inputNode = getInputType(dataIndex, datatype, datasource, valuekey, memberkey, cellValueChange, record);
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: required,
                            message: `${title} không được để trống!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

//description: lấy input theo value type
//--------------------------------------
//created by: ntkien 
//created date: 17.09.2020
function getInputType(dataIndex, valueType, data, valuekey, memberkey, cellValueChange, record) {
    if (data) {
        return <Select onChange={(value) => {
            if (cellValueChange) {
                // updateValue(record, dataIndex, valueType, value);
                cellValueChange(record, dataIndex, value, valueType);
            }
        }}  >
            {data.map((item, index) => <Option value={item[valuekey]}>{item[memberkey]}</Option>)}
        </Select>
    }
    else {
        switch (valueType) {
            case Constant.valueType.int:
            case Constant.valueType.number:
                return <InputNumber onChange={(value) => {
                    // updateValue(record,dataIndex,valueType,value);
                    if (cellValueChange) {
                        cellValueChange(record, dataIndex, value, valueType)
                    }
                }} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')} />
            case Constant.valueType.decimal:
                return <InputNumber onChange={(value) => {
                    // updateValue(record, dataIndex, valueType, value);
                    if (cellValueChange) {
                        cellValueChange(record, dataIndex, value, valueType)
                    }
                }} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                break;
            case Constant.valueType.percent:
                return <InputNumber onChange={(value) => {
                    // updateValue(record, dataIndex, valueType, value);
                    if (cellValueChange) {
                        cellValueChange(record, dataIndex, value, valueType)
                    }
                }} min={0} max={100} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                break;
            case Constant.valueType.datetime:
                return <DatePicker onChange={(e) => {
                    // updateValue(record, dataIndex, valueType, e);
                    if (cellValueChange) {
                        cellValueChange(record, dataIndex, e, valueType)
                    }
                }} style={{ width: '100%' }} format={Constant.FORMAT_DATE} />
                break;
            default:
                return <Input onBlur={(e) => {
                    // updateValue(record, dataIndex, valueType, e.currentTarget.defaultValue);
                    if (cellValueChange) {
                        cellValueChange(record, dataIndex, e.currentTarget.defaultValue, valueType)
                    }
                }} />
                break;
        }
    }
}
//description: Cập nhật giá trị cho cell
//--------------------------------------
//created by: ntkien 
//created date: 19.09.2020
function updateValue(record, dataIndex, valueType, value) {
    record[dataIndex] = value;
}
const ResizableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={e => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};
var components = {
    header: {
        cell: ResizableTitle,
    },
    body: {
        cell: EditableCell
    }
};
class GridTable extends React.Component {
    constructor(props) {
        super();
        this.state = {
            columns: props.columns,
            operations: [],
            editingKey: '',
            tableId: common.getnewid(),
            current: null,
            originalItem: null
        }
        this.myform = React.createRef();
    }
    handleSearch = (setSelectedKeys, selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    handleReset = clearFilters => {
        clearFilters();
    };
    convertColumnValue = (value, dataType, datasource, memberkey, dataIndex) => {
        if (datasource && datasource.length > 0) {
            var arr = datasource.filter(x => x[dataIndex] == value);
            if (arr && arr.length > 0) {
                return arr[0][memberkey];
            }
        }
        else {
            switch (dataType) {
                case Constant.valueType.boolean:
                    return value ? <CheckSquareOutlined style={{ color: '#0095ff' }} /> : <BorderOutlined style={{ color: '#0095ff' }} />;
                    break;
                case Constant.valueType.datetime:
                case Constant.valueType.daterange:
                    if (value) {
                        var date = new Date(value);
                        return common.format("{0}/{1}/{2}", common.convertMonthDate(date.getDate()), common.convertMonthDate(date.getMonth() + 1), date.getFullYear());
                    }
                    else {
                        return "";
                    }
                    break;
                case Constant.valueType.int:
                case Constant.valueType.decimal:
                case Constant.valueType.number:
                    return common.formatNumber(value);
                    break;
                case Constant.valueType.percent:
                    return common.formatPercent(value);
                    break;
                default:
                    return value;
                    break;
            }
        }
    }
    getOperationCombo(col, setSelectedKeys, selectedKeys, confirm, clearFilters) {
        var me = this;
        var control = null;
        var dataSource = null;
        switch (col.dataType) {
            case Constant.valueType.int:
            case Constant.valueType.decimal:
            case Constant.valueType.number:
            case Constant.valueType.datetime:
                dataSource = Constant.operationCompare;
                break;
            case Constant.valueType.daterange:
                break;
            default:
                dataSource = Constant.operationFilter;
                break;
        }
        if (dataSource && dataSource.length > 0) {
            control = <Select
                value={me.getOperation(col.dataIndex)}
                onChange={(value) => {
                    // setSelectedKeys(me.buildSelectedValue(col, null));
                    me.setOperation({ name: col.dataIndex, value });
                    setTimeout(() => this.filterControl.focus(), 100);
                }}
                ref={node => {
                    this.selectOperation = node;
                }}
                className='operation-filter' style={{ width: 48 }} showArrow={false} >
                {
                    dataSource.map((item, index) => {
                        return (<Option title={item.title} value={item.value}>{item.text}</Option>)
                    })
                }

            </Select>
        }
        return control;
    }

    //description: hàm thực hiện cập nhật một operation
    //-------------------------------------------------
    //created by: ntkien 
    //created date: 03.09.2020
    setOperation(obj) {
        var me = this;
        if (!obj) {
            return;
        }
        var arr = me.state.operations;
        var allowAdd = true;
        let i = 0;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].name == obj.name) {
                arr[i].value = obj.value;
                allowAdd = false;
                break;
            }
        }
        if (allowAdd) {
            arr.push(obj);
        }
        me.setState({ operations: arr });
    }
    //description: get operation by dataindex
    //----------------------------------------
    //created by: ntkien 
    //created date: 03.09.2020
    getOperation(dataIndex) {
        var me = this;
        var result = '1';
        var arr = me.state.operations;
        let i = 0;
        if (arr && arr.length > 0) {
            for (i = 0; i < arr.length; i++) {
                if (arr[i].name == dataIndex) {
                    result = arr[i].value;
                    break;
                }
            }
        }
        return result;
    }
    //description: hàm buid selectedValue filter
    //------------------------------------------
    //created by: ntkien 
    //created date: 03.09.2020
    buildSelectedValue(col, obj) {
        var me = this;
        if (!obj) {
            return []
        }
        var ops = me.state.operations.filter(item => item.name == col.dataIndex);
        var opVal = ops && ops.length > 0 ? ops[0].value : '1';
        if (col.dataType == Constant.valueType.daterange) {
            opVal = Constant.operationValues.bettween;
        }
        return [{
            operation: opVal,
            dataType: col.dataType ? col.dataType : Constant.valueType.string,
            filterVal: obj
        }]
    }
    //description: Build editor cho filter
    //------------------------------------------
    //created by: ntkien 
    //created date: 03.09.2020
    getDropdownControlFilter(col, setSelectedKeys, selectedKeys, confirm, clearFilters) {
        var me = this;
        var control = null;
        switch (col.dataType) {
            case Constant.valueType.datetime:
                control = <DatePicker
                    format="DD/MM/YYYY"
                    ref={node => {
                        this.filterControl = node;
                    }}
                    onPressEnter={value => {
                        this.handleSearch(setSelectedKeys, selectedKeys, confirm, col.dataIndex)
                    }}
                    onChange={(date, dateString) => {
                        setSelectedKeys(me.buildSelectedValue(col, date))
                    }
                    }
                    value={(selectedKeys && selectedKeys.length > 0) ? selectedKeys[0].filterVal : null}
                    placeholder={`Tìm kiếm ${col.title}`} />
                break;
            case Constant.valueType.daterange:
                control = <RangePicker
                    format="DD/MM/YYYY"
                    ref={node => {
                        this.filterControl = node;
                    }}
                    onPressEnter={value => {
                        this.handleSearch(setSelectedKeys, selectedKeys, confirm, col.dataIndex)
                    }}
                    onChange={(dates, dateStrings) => {
                        setSelectedKeys(me.buildSelectedValue(col, dates))
                    }
                    }
                    value={(selectedKeys && selectedKeys.length > 0) ? selectedKeys[0].filterVal : null}
                />
                break;
            case Constant.valueType.int:
            case Constant.valueType.decimal:
            case Constant.valueType.number:
                control = <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    ref={node => {
                        this.filterControl = node;
                    }}
                    value={(selectedKeys && selectedKeys.length > 0) ? selectedKeys[0].filterVal : null}
                    placeholder={`Tìm kiếm ${col.title}`}
                    onPressEnter={value => {
                        this.handleSearch(setSelectedKeys, selectedKeys, confirm, col.dataIndex)
                    }}
                    onChange={value => setSelectedKeys(me.buildSelectedValue(col, value ? value.toString() : ''))}
                />
                break;
            default:
                control = <Input
                    ref={node => {
                        this.filterControl = node;
                    }}
                    value={(selectedKeys && selectedKeys.length > 0) ? selectedKeys[0].filterVal : null}
                    placeholder={`Tìm kiếm ${col.title}`}
                    onPressEnter={value => {
                        this.handleSearch(setSelectedKeys, selectedKeys, confirm, col.dataIndex)
                    }}
                    onChange={e => setSelectedKeys(me.buildSelectedValue(col, e.target.value))} />
                break;
        }

        return control;
    }
    getColumnSearchProps = col => (col.allowFilter ? {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Space>
                    {this.getOperationCombo(col)}
                    {this.getDropdownControlFilter(col, setSelectedKeys, selectedKeys, confirm, clearFilters)}
                    <Button title='Tìm kiếm' type='primary' style={{ width: 35 }} icon={<SearchOutlined />} onClick={() => this.handleSearch(setSelectedKeys, selectedKeys, confirm, col.dataIndex)} >
                    </Button>
                    <Button title='Xóa tìm kiếm' style={{ width: 35 }} danger={true} icon={<CloseOutlined />} onClick={() => this.handleReset(clearFilters)} >
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <FilterFilled style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.filterControl.focus(), 100);
            }
        }
    } : null);

    handleResize = index => (e, { size }) => {
        var me = this;
        me.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    //description: Đánh dấu selected item 
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    setSelectedRow(rowId) {
        var me = this;
        const selectedClass = 'grid-table-selected-row';
        var element = document.getElementById(me.state.tableId);
        if (!element) {
            return;
        }
        var rows = element.querySelectorAll('.ant-table-row');
        if (rows && rows.length > 0) {
            rows.forEach(element => {
                element.classList.remove(selectedClass);
            });
        }
        var element = element.querySelector("[data-row-key='" + rowId + "']");
        if (element) {
            element.classList.add(selectedClass);
        }
    }
    componentDidMount() {
        var me = this;
        if (me.props.data && me.props.data.length > 0) {
            var selectedId = me.props.data[0][me.props.rkey];
            me.setSelectedRow(selectedId);
            me.state.current = me.props.data[0]
        }
    }
    componentDidUpdate() {
        var me = this;
        if (me.props.activeFirstRow && me.props.data && me.props.data.length > 0) {
            var selectedId = me.props.data[0][me.props.rkey];
            me.scrollToTop();
            me.setSelectedRow(selectedId);
            me.state.current = me.props.data[0]
        }
    }
    scrollToTop() {
        var me = this;
        var element = document.getElementById(me.state.tableId);
        var tableBody = element.querySelector('.ant-table-body');
        if (tableBody) {
            tableBody.scrollTop = 0;
        }
    }

    //description: lấy bản ghi hiện tại đang select
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    getCurrent() {
        var me = this;
        return me.state.current;
    }
    //description: set select cho một bản ghi
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    setCurrent(record) {
        var me = this;
        setTimeout(() => {
            me.state.current = record;
            me.setSelectedRow(record[me.props.rkey]);
        }, 50)
    }
    //description: focus vào một row
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    focusRow(record) {
        var me = this;
        setTimeout(() => {
            me.state.current = record;
            me.state.originalItem = { ...record };
            me.edit(record);
            me.setSelectedRow(record[me.props.rkey])
        }, 50);
    }

    //description: binding lại giá trị đang sửa
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    reBindingForm(record) {
        var me = this;
        me.myform.current.setFieldsValue({
            ...record,
        });
        me.forceUpdate();
    }
    //description: update lại grid
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    updateGrid() {
        var me = this;
        me.forceUpdate();
    }
    //description: update lại grid về mode view
    //----------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    updateGridToView() {
        var me = this;
        me.setState(
            {
                editingKey: ''
            }
        );
    }
    //description: Sửa row
    //---------------------
    //created by: ntkien 
    //created date: 17.09.2020
    edit = (record) => {
        var me = this;
        me.myform.current.setFieldsValue({
            ...record,
        });
        me.setState(
            {
                editingKey: record.RowId
            }
        );
    };
    //description: kiểm tra có phải là đang sửa đối tượng ko
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    isEditing = (record) => record.RowId === this.state.editingKey;

    //description: Cập nhật thay đổi trên row
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    save = async (record) => {
        var me = this;
        const row = await me.myform.current.validateFields();
        if (row) {
            Object.keys(row).forEach((key) => {
                record[key] = row[key];
            })
            if (!record.EditMode || record.EditMode == Constant.editMode.none) {
                record.EditMode = Constant.editMode.edit;
            }
            me.setState(
                {
                    editingKey: ''
                }
            );
            if (me.props.acceptChange) {
                me.props.acceptChange(record);
            }
        }
    }

    //description: hủy việc sửa trên row
    //------------------------------------------
    //created by: ntkien 
    //created date: 17.09.2020
    cancel = (record) => {
        var me = this;
        if (me.state.originalItem) {
            Object.keys(record).forEach((key) => {
                record[key] = me.state.originalItem[key];
            })
        }
        me.setState(
            {
                editingKey: ''
            }
        );
    }
    render() {
        var me = this;
        var props = me.props;

        var scroll = (props.scrollheight && props.scrollheight) > 0 ? {
            x: false,
            y: props.scrollheight
        } : null;
        var columnsresize = me.state.columns.map((col, i) => {
            if (!col.editable) {
                return {
                    ...col,
                    render: (text, record, index) => {
                        return me.convertColumnValue(text, col.dataType);
                    },
                    ...me.getColumnSearchProps(col),
                    onHeaderCell: column => ({
                        width: column.width,
                        onResize: me.handleResize(i),
                    }),
                }
            }
            return {
                ...col,
                render: (text, record, index) => {
                    return me.convertColumnValue(text, col.dataType, col.datasource, col.memberkey, col.dataIndex);
                },
                ...me.getColumnSearchProps(col),
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: me.handleResize(i),
                }),
                onCell: (record) => {
                    return ({
                        record,
                        datatype: col.dataType ? col.dataType : Constant.valueType.string,
                        required: col.required,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: me.isEditing(record),
                        cellValueChange: me.props.cellValueChange,
                        memberkey: col.memberkey,
                        valuekey: col.valuekey,
                        datasource: col.datasource
                    })
                }
            }
        }
        );
        if (props.allowEdit) {
            columnsresize.push(
                {
                    width: 60,
                    align: 'center',
                    render: (_, record) => {
                        const editable = me.isEditing(record);
                        return editable ? (
                            // <Button size='small' shape='round' type="primary" icon={<FileDoneOutlined />} />
                            <Space size={15} >
                                <Tooltip title="Cập nhật" color='blue'>
                                    <a onClick={() => { me.save(record) }}> <FileDoneOutlined style={{ fontSize: 17 }} /></a>
                                </Tooltip>
                                <Tooltip title="Hủy bỏ" color='red'>
                                    <a onClick={() => { me.cancel(record) }} > <FileExcelOutlined style={{ fontSize: 17, color: 'red' }} /></a>
                                </Tooltip>
                            </Space>
                        ) : null
                    },
                }
            );
        }
        var menu = {
            tableId: me.state.tableId,
            menu: me.props.menu
        }
        return (
            <>
                <Form ref={me.myform} component={false}>
                    <Table
                        size="small"
                        id={me.state.tableId}
                        onChange={me.props.onChange}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    me.setSelectedRow(record[props.rkey]);
                                    me.state.current = record;
                                    if (me.props.onRowClick) {
                                        me.props.onRowClick(record);
                                    }
                                }, // click row
                                onDoubleClick: event => {
                                    if (!props.allowEdit) {
                                        me.setSelectedRow(record[props.rkey]);
                                        me.state.current = record;
                                        me.state.originalItem = { ...record };
                                        if (me.props.onDbRowClick) {
                                            me.props.onDbRowClick(record);
                                        }
                                    }
                                    else if (!me.isEditing(record)) {
                                        me.setSelectedRow(record[props.rkey]);
                                        me.state.current = record;
                                        me.state.originalItem = { ...record };
                                        if (me.props.onDbRowClick) {
                                            me.props.onDbRowClick(record);
                                        }
                                        if (!me.props.disabled) {
                                            me.edit(record);
                                        }
                                    }
                                }, // double click row
                                onContextMenu: event => {
                                    event.preventDefault();
                                    if (me.props.menu) {
                                        var selector = me.state.tableId + 'popup'
                                        var popup = document.getElementById(selector);
                                        if (popup && popupWidth == 0) {
                                            popupWidth = popup.clientWidth;
                                            popupHeight = popup.clientHeight;
                                        }
                                        if (me.props.onRowClick) {
                                            me.props.onRowClick(record);
                                        }
                                        me.setSelectedRow(record[props.rkey]);
                                        me.state.current = record;
                                        if (!showContextMenu) {
                                            document.addEventListener('click', function onClickOutside() {
                                                // me.setState({ popup: { showPopup: false } })
                                                showContextMenu = false;
                                                if (popup && popup.style) {
                                                    popup.style.display = 'none';
                                                }
                                                document.removeEventListener('click', onClickOutside)
                                            })
                                        }
                                        var rect = event.currentTarget.getBoundingClientRect()
                                        var element = document.getElementById(me.state.tableId);
                                        var ele = element.querySelector('.ant-table-body');
                                        var rectele = ele.getBoundingClientRect();
                                        var x = event.screenX - rect.left;
                                        //tràn sang bên phải sát quá thì show sang bên trái
                                        if (event.screenX + popupWidth > window.innerWidth) {
                                            x = event.screenX - popupWidth - rect.left
                                        }
                                        //tràn xuống dưới sát quá thì show lên trên
                                        var y = event.screenY - rectele.top - 30
                                        if (event.screenY + popupHeight > window.innerHeight) {
                                            y = event.screenY - rectele.top - 30 - popupHeight
                                        }

                                        var popupobj = {
                                            record,
                                            showPopup: true,
                                            x,
                                            y
                                        }
                                        popup.style.visibility = 'visible';
                                        popup.style.left = `${popupobj.x}px`
                                        popup.style.top = `${popupobj.y}px`
                                        popup.style.display = 'block';
                                    }
                                }, // right button click row
                                onMouseEnter: event => { }, // mouse enter row
                                onMouseLeave: event => { }, // mouse leave row
                            };
                        }}
                        bordered
                        rowKey={props.rkey}
                        scroll={
                            scroll
                        }
                        components={components}
                        // defaultExpandedRowKeys={me.props.expandkeys}
                        loading={props.isbusy}
                        pagination={false}
                        columns={columnsresize}
                        dataSource={props.data} />
                    <Popup {...menu} />
                </Form>

            </>
        )
    }
}
export default GridTable;