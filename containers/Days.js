var React = require('react');
var ReactDOM = require('react-dom');

import Day from '../components/Day';

class Days extends React.Component {

    constructor(props) {
        super();
        let activeDate = moment().format('YYYY-MM-DD');
        this.state = {activeDate:activeDate}
    };

    componentDidMount() {

    }

    _setActiveDate(dateString){
        this.setState({
            activeDate:dateString
        })
    }

    _getDays(){

        let days = [];
        let date;
        let dayText;
        let now = moment();
        let tomorrow = moment().add(1,'days');

        for (let i = -2; i < 7; i++) {
            let active;
            let btnId;
            let dateString;
            date = moment().add(i, 'days');
            dateString = date.format('YYYY-MM-DD');

            if(dateString == this.state.activeDate){
                active = 'active'
            };

            switch(true){
                case parseInt(i) === -2:
                    dayText = 'Now';
                    btnId = 'now-btn';
                    date = moment();
                    dateString = date.format('YYYY-MM-DD');
                    break;
                case date.isSame(now,'day'):
                    dayText = 'Today';
                    break;
                case date.isSame(tomorrow,'day'):
                    dayText = 'Tomorrow';
                    break;
                default:
                    dayText = date.format('ddd Do');
            }


            days.push(<Day
                key={i}
                date={date}
                dayText={dayText}
                active={active}
                btnId={btnId}
                dateString={dateString}
                getDay={this.props.getDay}
                setActiveDate={this._setActiveDate.bind(this)}

            />);
        }
        return <ul  className="days-nav list-inline">{days}</ul>;
    }

    render() {
        let days = this._getDays();

        return <div key="74567">{days}</div>;
    }
}

export default Days;
