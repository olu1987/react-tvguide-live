var React = require('react');

class Programme extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if( this.props.nowOn !== nextProps.nowOn || this.props.epg === nextProps.epg && this.props.left !==  nextProps.left){
            return true;
        }else{
            return false
        }
    }

    _goToChannel(){
        window.location.href = '/live/' + this.props.channel;
    }
    _goToReplay(){
        window.location.href = '/watch/replay/' + this.props.replayId;
    }

    _showModal(){
        var modal = $('#programme-info-modal');

        //Modal thumbnail
        var thumbnail = this.props.thumbnail;
        $('.modal-thumbnail', modal).css('background-image','url('+ thumbnail + ')');

        //Modal programme title
        var title = this.props.title;
        $('.modal-title', modal).text(title);

        //Modal channel logo
        var channelLogo = this.props.logo;
        $('.modal-channel', modal).attr('src', channelLogo);

        //Modal time
        var timeString = this.props.startTime + ' - ' + this.props.endTime;
        $('.modal-time', modal).html(timeString);

        //modal description
        var description = this.props.synopsis;
        $('.modal-description', modal).html(description);

        modal.modal('show');
    }

    render() {

        let blackout = '';
        let detailElements;
        let nowShowing;
        let clickAction;
        let replayIcon;
        let replay = this.props.replayId;
        let title = this.props.title;
        let replayClass;
        let tooltip = '';
        let tooltipPlacement;
        let noWidth;
        let thinWidth;

        if(this.props.blackout) {
            blackout = ' blackout ';
            tooltip = 'tooltip';
            clickAction = function(){
                return false;
            };
            title = 'Content not available'
        } else if (this.props.nowOn) {
            nowShowing = 'now ';
            clickAction = this._goToChannel.bind(this);
        } else if(replay) {
            clickAction = this._goToReplay.bind(this);
            replayIcon = <img className="img-responsive replay-play-icon" src="/assets/bfbs/images/bfbs-orange-play.png"/>
            replayClass = 'replay'
        }else{
            nowShowing = 'not-now';
            clickAction = this._showModal.bind(this);
        }

        if(this.props.width === 0){
            noWidth = ' hidden'
        }else if (this.props.width <= 30){
            thinWidth = ' thin-width ';
            clickAction = this._showModal.bind(this);
        }

        tooltipPlacement = this.props.left === 0 ? 'right' : 'left';


        let divStyle = {
            position: 'absolute',
            left: this.props.left,
            width: this.props.width,
        };

        if(this.props.width <= 100){
            divStyle.fontSize = '20px';
            divStyle.paddingTop = '20px';
            divStyle.paddingRight = '10px';
            divStyle.textAlign = 'center';
        }

        if(this.props.width > 100){
            detailElements = <span>
            <span className="programme-title">{this.props.title}</span>
            <span className="times">
                {replayIcon}
                <span className={"time-string " + replayClass}>{this.props.startTime} - {this.props.endTime}</span>
            </span>
            </span>


        }else{

            detailElements = <div className={"short-programme-details " + replayClass}>
                <div data-html="true" data-toggle="tooltip" data-placement={tooltipPlacement} title={this.props.title + '<br>' +
                this.props.startTime + ' - ' +  this.props.endTime} className="info-col more-info ">
                    <i  className="fa fa-info-circle" aria-hidden="true">
                    </i>
                </div>
                {replayIcon}
            </div>
        }

        nowShowing = nowShowing ? nowShowing : '';
        blackout = blackout ? blackout : '';
        noWidth = noWidth ? noWidth : '';
        thinWidth = thinWidth ? thinWidth : '';


        return <div data-toggle={tooltip} data-placement="left" data-title={title} data-thumbnail={this.props.image} onClick={clickAction} key={this.props.id}  className={"programme " + nowShowing + blackout + noWidth + thinWidth}
                    style={divStyle}>
            {detailElements}
        </div>;

    }

}

export default Programme;