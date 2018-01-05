var React = require('react');

class Day extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){

        let date = this.props.dateString;
        let detailElements = <a onClick={() => {this.props.getDay(date); this.props.setActiveDate(date)}} id={this.props.btnId} className={this.props.active}>{this.props.dayText}</a>;
        return <li>{detailElements}</li>;

    }

}

export default Day;