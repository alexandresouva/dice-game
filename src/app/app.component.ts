import { Component, OnInit } from '@angular/core';
import { Player } from './models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  player1: Player = {
    id: 1,
    name: 'Player 1',
    currentScore: 0,
    totalScore: 0,
    isActive: true,
    isWinner: false,
  };

  player2: Player = {
    id: 2,
    name: 'Player 2',
    currentScore: 0,
    totalScore: 0,
    isActive: false,
    isWinner: false,
  };
}
