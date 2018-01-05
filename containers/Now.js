let React = require('react');
let ReactDOM = require('react-dom');

import Channel from '../components/now/Channel';
import CurrentChannel from '../components/now/CurrentChannel';

class Now extends React.Component {
    constructor(props){
        super();
        let activeChannel = parseInt(active) || 683;
        console.log(activeChannel);
        this.state = {channels:nowData,now:moment(),load:false, activeChannel:activeChannel}
    }

    componentDidMount(){
        setInterval(function () {
             $.getJSON('/now-ajax', function(data) {
                 let newNowData = data;
                 this.setState({now: new moment(),channels:newNowData})
            }.bind(this));

        }.bind(this), 30000);

        let selectChannel;
        ! this.state.load ? this.setState({player:this._playerConfig()}): false;
        this.setState({load:true});
    }

    componentDidUpdate(){
        let channelInfo = document.getElementById('current-channel-info');
        let activeProgramme;
        let activeLogo;
        let channels = this.state.channels;
        let channelsLength = this.state.channels.length;

        for(var i = 0; i < channelsLength; i++){
            if(channels[i].id == this.state.activeChannel){
                activeProgramme = channels[i].tiles[0];
                activeLogo = channels[i].logo;
            }
        }

        ReactDOM.render(<CurrentChannel activeLogo={activeLogo} activeProgramme={activeProgramme} activeChannel={this.state.activeChannel} active />, channelInfo);
    }

    render() {
        let channels = this._getChannels(this.state.channels);
        return (<div>{channels}</div>);
    }

    _getChannels(data){
        let now = this.state.now;

        return data.map((programme) => {
                let episode = programme.tiles[0];
                let active = false;
                programme.start = moment(episode.start);
                programme.end = moment(episode.end);
                programme.durationInMinutes = episode.duration/60;
                programme.startString = programme.start.format('YYYY MMM D HH:mm SSSS');
                programme.endString = programme.end.format('YYYY MMM D HH:mm SSSS');
                programme.startTime = programme.start.format("HH:mm");
                programme.endTime = programme.end.format("HH:mm");
                programme.blackout = episode.blackout;

                let programmeId = parseInt(programme.id);
                if(programmeId === parseInt(this.state.activeChannel)){
                    active = 'active';
                }
            return <Channel
                blackout={programme.blackout}
                logo={programme.image}
                title={programme.title}
                programme={programme.tiles[0]}
                key={programme.id}
                id={programme.id}
                time={programme.startTime + ' - ' + programme.endTime}
                active={active}
                player={this.state.player}
                setActiveChannel={this._setActiveChannel.bind(this)}

            >
            </Channel>
        });
    }

    _playerConfig() {

        // Get embed element by id
        let embedElement = $("#watch");
        let data = embedElement.data();
        let wrapperId = embedElement.attr('id') + '-wrapper';
        let wrapper = $(document.createElement('div')).attr('id', wrapperId).addClass('ssmp-wrapper');
        embedElement.wrap(wrapper);

        // Insert THEOplayer html
        $('#' + wrapperId).html('<div class="video-js theoplayer-skin theo-seekbar-above-controls content-box vjs-fluid"></div>');
        // Init player
        let element = document.querySelector('.video-js');
        let player = new THEOplayer.Player(element, {
            libraryLocation: '/assets/' + data.client + '/THEOplayer',
            width: '100%'
        });

        player.poster = data.poster;
        player.autoplay = data.autoplay !== undefined ? data.autoplay : false;
        let eventsObject = eval(data.events);
        player.source = {
            sources: [{
                src: data.stream,
                type: 'application/x-mpegurl'
            }]
        };

        // Set event handlers
        if (eventsObject != undefined) {
            $.each(eventsObject, function (eventName, functionCode) {
                player.addEventListener(eventName, functionCode);
            });
        }

        return player;
    }

    _setActiveChannel(channelId){
        this.setState({activeChannel:channelId})
    }
}

export default Now;
