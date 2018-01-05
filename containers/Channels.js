let React = require('react');
let ReactDOM = require('react-dom');

import Channel from '../components/channel';
import Days from './Days';

class Channels extends React.Component {

    constructor(props){
        super();
        this.setNowLinePosition = this._setNowLinePosition;
        this.state = {channels:false,now:moment(),isToday:true,nowLeft:this.setNowLinePosition(), load:false,container: document.getElementById('container')};

    };

    componentDidMount(){

        let daysNav = document.querySelector('.day-nav-wrap');

        ReactDOM.render(<Days getDay={this._getDay.bind(this)}></Days>, daysNav);
        if(! this.state.load) {
            this._setData();
        }



        setInterval(function () {
            let setData = this.state.isToday ? this._setData: () => {};
            this.setState({now: new moment(), nowLeft:this._setNowLinePosition()},setData);

        }.bind(this), 30000);


    }

    componentDidUpdate(){
        this._load();
        this._setNow()
    }

    render() {
        let nowStyle = {left:this.state.nowLeft};
        let istoday = this.state.isToday ? 'is-today' : '';

        return [
            <div id="now-indicator" style={nowStyle} key="546" className={"now-col " + istoday}></div>,<div key="777">{this.state.channels}</div>
        ];
    }

    _transformData(data){
        let now = this.state.now;
        let isToday = this.state.isToday;

        return data.map((channel) => {
            channel.tiles.map(function(programme){
                programme.start = moment(programme.start);
                programme.end = moment(programme.end);
                programme.durationInMinutes = programme.duration/60;
                programme.startString = programme.start.format('YYYY MMM D HH:mm SSSS');
                programme.endString = programme.end.format('YYYY MMM D HH:mm SSSS');
                programme.startTime = programme.start.format("HH:mm");
                programme.endTime = programme.end.format("HH:mm");

                function setNowOn(){
                    switch(true){
                        case programme.startString < now.format('YYYY MMM D HH:mm SSSS') && programme.endString > now.format('YYYY MMM D HH:mm SSSS'):
                            programme.nowOn = true;
                            break;
                        default:
                            programme.nowOn = false;
                    }
                }

                setNowOn();

            });

            return <Channel onClick={this._showModal} logo={channel.logo} title={channel.title} programmes={channel.tiles} channel={channel.id} key={channel.id}></Channel>
        });

    }

    _setData(dateString){

        console.log("setData called");
        let requestString;
        requestString = '/tvguide-ajax';
        $.getJSON(requestString, function(data) {
            let tranformedData = this._transformData(data);
            this.setState({channels:tranformedData});
            this._channelLogosToggle(data);
        }.bind(this));
    }

    _getDay(dateString) {

        console.log("getDay called");
        let now = moment().format('YYYY-MM-DD');
        let requestString;
        let isToday;
        requestString = dateString ? '/tvguide-ajax?date=' + dateString : '/tvguide-ajax';
        isToday = moment(dateString).isSame(now, 'day') ? true : false

        $.getJSON(requestString, function(data) {
            let tranformedData = this._transformData(data);
            this.setState({channels:tranformedData,isToday:isToday});
            this._channelLogosToggle(data);
        }.bind(this));
    }


    _load(){
        this._setNowLinePosition();
        this._toggleLoader('hide');
        this._setNow();
        this._tooltipInit();

        ! this.state.load ? this.setState({load:true}, function(){
            this.state.container.scrollLeft = this.state.nowLeft - 250;
        }.bind(this)): false;

    }

    _toggleLoader(state){

            let container = document.getElementById('container');
            let loaderContainer = document.querySelector('.tvguide .loader-container');
            let logoColumn = document.querySelector('.logo-col');
            let daysNav = document.querySelector('.day-nav-wrap');
            let timeline = document.getElementById('timeline');

        switch (state) {

            case 'show':

                removeClass(loaderContainer,'hidden');
                addClass(container,'hidden');
                addClass(logoColumn,'hidden');
                addClass(daysNav,'hidden');
                addClass(timeline,'hidden');
                break;

            case 'hide':

                addClass(loaderContainer,'hidden');
                removeClass(container,'hidden');
                removeClass(logoColumn,'hidden');
                removeClass(daysNav,'hidden');
                removeClass(timeline,'hidden');
                break;
        }

    }

    _setNow(){
        //Find position of programs on now by finding .now line

        let nowBtn = document.getElementById('now-btn');
        nowBtn.addEventListener('click', this._goToNow.bind(this));
    }

    _tooltipInit(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    _goToNow(){
        let position = window.getComputedStyle(document.getElementById('now-indicator')).left;
        position = parseInt(position) - 250 + 'px';
        $(this.state.container).stop().animate({scrollLeft:position}, 500);
    }

    _logDate(){
        console.log(this.props.dateString)
    }
    _setNowLinePosition(){
        let abs=Math.abs;
        let now = moment();
        let nowMinutesLeft = moment().startOf('day').diff(now,'minutes');
        let nowLeftPixels = (abs(nowMinutesLeft) * 10) + 67;

        return nowLeftPixels;
    }

    _channelLogosToggle(channels){
        let presentChannels = [];
        let channelLogos = document.querySelectorAll('.channel-logo');

        for (let value of channels) {
            presentChannels.push(value.title)
        }

        for(let logo of channelLogos){
            let present = presentChannels.includes(logo.dataset.channel);
            present ? removeClass(logo,'hidden'): addClass(logo,'hidden')
        }
    }

}



export default Channels;