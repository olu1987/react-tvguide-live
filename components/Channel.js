var React = require('react');

import Programme from './Programme';

class Channel extends React.Component {
    constructor(props){
        super();
    }

    _getProgrammes(programmes){
        return programmes.map(function (programme) {
            return <Programme

                blackout={programme.blackout}
                left={programme.left}
                width={programme.width}
                title={programme.title}
                start={programme.start}
                end={programme.end}
                epg={programme.id}
                key={programme.id}
                programmeStart={programme.start}
                programmeId={programme.id}
                replayId={programme.replay_id}
                nowOn={programme.nowOn}
                startTime={programme.startTime}
                endTime={programme.endTime}
                thumbnail={programme.image}
                synopsis={programme.synopsis}
                logo={this.props.logo}
                channel={this.props.channel}


            />;

        }.bind(this))

    }

    render(){

        let programmes = this._getProgrammes(this.props.programmes);
        return(
            <div className={"channel " + this.props.title}>{programmes}</div>
        )
    }
}

export default Channel;