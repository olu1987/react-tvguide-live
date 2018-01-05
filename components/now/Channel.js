var React = require('react');

class Channel extends React.Component {

    constructor(props) {
        super(props);
    }

    _changeChannel(){
        window.location.href = '/live/' + this.props.id
    }

    render(){
        let nowStyle = {
            backgroundImage: "url(" + this.props.programme.image + ")",
            backgroundSize:'cover'
        };

        let blackoutClass = '';
        let blackoutText = '';

        if(this.props.blackout){
            blackoutClass = ' blackout ';
             blackoutText = 'Content not available';
        }

        let detailElements =
            <div className={"channel sidebar-row "+ this.props.active}>
                <div className="now-logo">
                    <img src={this.props.logo}/>
                </div>
                <div className="col-xs-6 now-next-details hidden-xs">
                    <div style={nowStyle} className="now-preview-thumbnail" />
                </div>
                <div className="col-xs-6 now-next-details">
                    <h5>{this.props.programme.title}</h5>
                    <p className="time">{this.props.time}</p>
                    <p className="live-text">{this.props.active ? 'Live':false}</p>
                </div>
            </div>;

        return <div onClick={this._selectChannel.bind(this)}  className={"now-link" + blackoutClass}>{detailElements}</div>;

    }

    _selectChannel(){
        let requestURL = '/stream/' + this.props.id;
        $.getJSON(requestURL, function(data) {
            let stream = data.stream_url;
            this.props.player.source = {
                sources: [{
                    src: stream,
                    type: 'application/x-mpegurl'
                }]
            };
            this.props.setActiveChannel(this.props.id);
        }.bind(this));
    }

}

export default Channel;