import React from 'react';
import { Table, Button, Input, Space, DatePicker, Select,InputNumber } from 'antd';
import { Resizable } from 'react-resizable';
import Popup from './Popup';
import { SearchOutlined, CloseOutlined, CheckSquareOutlined, BorderOutlined, FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import * as Constant from '../../utility/Constant';
import * as common from '../../utility/common';

const { RangePicker } = DatePicker;
const { Option } = Select;

var showContextMenu = false;
var popupWidth = 0;
var popupHeight = 0;



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
};
class GridTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            operations: []
        }
    }
    handleSearch = (setSelectedKeys, selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    handleReset = clearFilters => {
        clearFilters();
    };
    convertColumnValue = (value, dataType) => {
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
            default:
                return value;
                break;
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
                    onChange={value => setSelectedKeys(me.buildSelectedValue(col, value?value.toString():''))}
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


    //resize column
    components = () => {
        var me = this;
        return {
            header: {
                cell: me.ResizeableTitle,
            }
        }
    };
    ResizeableTitle = props => {
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
    setSelectedRow(rowId) {
        const selectedClass = 'grid-table-selected-row';
        var rows = document.querySelectorAll('.ant-table-row');
        if (rows && rows.length > 0) {
            rows.forEach(element => {
                element.classList.remove(selectedClass);
            });
        }
        var element = document.querySelector("[data-row-key='" + rowId + "']");
        if (element) {
            element.classList.add(selectedClass);
        }
    }
    componentDidMount() {
        var me = this;
        if (me.props.data && me.props.data.length > 0) {
            var selectedId = me.props.data[0][me.props.rkey];
            me.setSelectedRow(selectedId);
        }
    }
    componentDidUpdate() {
        var me = this;
        if (me.props.activeFirstRow && me.props.data && me.props.data.length > 0) {
            var selectedId = me.props.data[0][me.props.rkey];
            me.scrollToTop();
            me.setSelectedRow(selectedId);
        }
    }
    scrollToTop() {
        var tableBody = document.querySelector('.ant-table-body');
        if (tableBody) {
            tableBody.scrollTop = 0;
        }
    }
    render() {
        var me = this;
        var props = me.props;

        var scroll = (props.scrollheight && props.scrollheight) > 0 ? {
            x: false,
            y: props.scrollheight
        } : null;
        var columnsresize = me.state.columns.map((col, i) => ({
            ...col,
            render: (text, record, index) => {
                return me.convertColumnValue(text, col.dataType);
            },
            ...me.getColumnSearchProps(col),
            onHeaderCell: column => ({
                width: column.width,
                onResize: me.handleResize(i),
            })
        }));
        var menu = {
            menu: me.props.menu
        }
        return (
            <div>
                <Table
                    size="small"
                    onChange={me.props.onChange}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                me.setSelectedRow(record[props.rkey]);
                                me.props.onRowClick(record);
                            }, // click row
                            onDoubleClick: event => {
                                me.setSelectedRow(record[props.rkey]);
                                me.props.onDbRowClick(record);
                            }, // double click row
                            onContextMenu: event => {
                                event.preventDefault();
                                var popups = document.getElementsByClassName('popup');
                                if (popups && popups.length > 0 && popupWidth == 0) {
                                    popupWidth = popups[0].clientWidth;
                                    popupHeight = popups[0].clientHeight;
                                }
                                me.props.onRowClick(record);
                                me.setSelectedRow(record[props.rkey]);
                                if (!showContextMenu) {
                                    document.addEventListener('click', function onClickOutside() {
                                        // me.setState({ popup: { showPopup: false } })
                                        showContextMenu = false;
                                        if(popups[0]&&popups[0].style){
                                            popups[0].style.display = 'none';
                                        }
                                        document.removeEventListener('click', onClickOutside)
                                    })
                                }
                                var rect = event.currentTarget.getBoundingClientRect()
                                var ele = document.querySelector('.ant-table-body');
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

                                var popup = {
                                    record,
                                    showPopup: true,
                                    x,
                                    y
                                }
                                popups[0].style.visibility = 'visible';
                                popups[0].style.left = `${popup.x}px`
                                popups[0].style.top = `${popup.y}px`
                                popups[0].style.display = 'block';
                                // popupHeight
                                // me.setState({
                                //     popup
                                // })
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
            </div>
        )
    }
}
export default GridTable;