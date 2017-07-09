import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';

import LoadingCircle from './LoadingCircle';
import Player from './Player';

import './HighscoreList.css';

const MINIMUM_GAMES = 4;
const AMOUNT_OF_PLAYERS = 10;

class HighscoreList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      playerStatistics: []
    };
  }


  componentDidMount() {
    this.props.rebase.bindToState('/games/ping-pong/player_statistics', {
      context: this,
      asArray: true,
      state: 'playerStatistics',
      queries: {
        orderByChild: 'rating'
      },
      then: () => {
        this.state.isLoading = false;
      }
    });
  }

  render() {
    const { isLoading, playerStatistics } = this.state;
    const { players } = this.props;
    console.log(playerStatistics);
    console.log(players);
    return (
      <div>
        <AppBar
          title={"Highscore"}
          showMenuIconButton={false}
          className={"header"}
        />
        <List>
          {
            !isLoading ?
              playerStatistics.reverse().filter((playerStatistic, index) => (
                playerStatistic.total_games >= MINIMUM_GAMES
              )).slice(0, AMOUNT_OF_PLAYERS).map((playerStatistic, index) => (
                <div key={`HighscoreList-${playerStatistic.key}`}>
                  <div className="highscore-list-item">
                    <Row middle="xs">
                      <Col xs={1}>
                        <span>#{index + 1}</span>
                      </Col>
                      <Col xs={11}>
                        <Player
                          horizontal
                          compact
                          player={Object.assign(playerStatistic, players[playerStatistic.key])}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Divider />
                </div>
              ))
              : <LoadingCircle />
          }
        </List>
      </div>
    );
  }
}

export default HighscoreList;