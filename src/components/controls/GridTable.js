import React from 'react';
import { Table, Button } from 'antd';
import { Resizable } from 'react-resizable';
import Popup from './Popup';
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
            popup: {
                record: null,
                showPopup: false,
                x: 0,
                y: 0
            }
        }
    }
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
        var columnsresize = me.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: me.handleResize(index),
            }),
        }));
        
        return (
            <div>
                <Table
                    size="small"
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                me.setSelectedRow(record[props.rkey])
                            }, // click row
                            onDoubleClick: event => {
                                me.setSelectedRow(record[props.rkey])
                            }, // double click row
                            onContextMenu: event => {
                                event.preventDefault();
                                // debugger
                                // me.setSelectedRow(record[props.rkey]);
                                // if (!me.state.popup.showPopup) {
                                //     document.addEventListener('click', function onClickOutside() {
                                //         me.setState({ popup: { showPopup: false } })
                                //         document.removeEventListener('click', onClickOutside)
                                //     })
                                // }
                                // var popup = {
                                //     record,
                                //     showPopup: true,
                                //     x: event.clientX,
                                //     y: event.clientY
                                // }
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
                <Popup {...me.state.popup} />
            </div>
        )
    }
}
// const GridTable = (props) => {
//     var cols = { ...props.columns };
//     var [columns, setColumnWidth] = useState(cols);


//     var columnsresize = columns.map((col, index) => ({
//         ...col,
//         onHeaderCell: column => ({
//             width: column.width,
//             onResize: handleResize(index),
//         }),
//     }));

//     return (
//         <Table
//             size="small"
//             bordered
//             key={props.key}
//             scroll={
//                 {
//                     y: props.scrollheight
//                 }
//             }
//             components={components}
//             // defaultExpandedRowKeys={me.props.expandkeys}
//             loading={props.isbusy}
//             pagination={false}
//             columns={columnsresize}
//             dataSource={props.data} />
//     )



// }
export default GridTable;