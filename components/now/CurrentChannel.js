var React = require('react');

class ChannelInfo extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount(){

    }

    render(){
        let programme = this.props.activeProgramme;
        let start =  moment(programme.start);
        let end =  moment(programme.end);
        let duration = moment.duration(end.diff(start));
        let minutesDuration = duration.asMinutes();

        let detailElements =
            <div className="row">
                <div className="col-xs-12 channel-info-details">
                    <img className="channel-info-logo" src={this.props.activeLogo} />
                    <div className="detail-wrap">
                        <h4>
                            {programme.title}
                        </h4>
                        <p className="hidden-xs">
                            {programme.synopsis}
                        </p>
                        <p className="duration">
                            {minutesDuration + ' mins'}
                        </p>
                    </div>
                </div>
            </div>;
        return <div className="channel-info">{detailElements}</div>;
    }

}

export default ChannelInfo;