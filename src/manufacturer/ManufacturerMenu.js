import React from 'react';

class ManufacturerMenu extends React.Component {

    constructor(props) {
        super();
        console.log(JSON.stringify(props, null, 2));
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        console.log('Click happened' + value);
        this.props.selectMenu(value);
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => {this.handleClick('drug')}}>Drug</button>
                </div>
                <div>
                    <button onClick={() => {this.handleClick('purcahse-order')}}>Purchase Order</button>
                </div>
                <div>
                    <button onClick={() => {this.handleClick('shipment')}}>Shipment</button>
                </div>
            </div>
        )
    }
}
export default ManufacturerMenu;