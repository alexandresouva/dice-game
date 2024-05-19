import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _diceRoll$ = new BehaviorSubject<number>(0);
  diceRoll = this._diceRoll$.asObservable();

  private _isPlaying = false;
  private _activePlayer!: Player;

  private _player1!: Player;
  private _player2!: Player;
  players$ = new BehaviorSubject<Player[]>([]);

  constructor() {
    this.initGame();

    this._diceRoll$.subscribe((diceRoll) => {
      if (!diceRoll) return;

      if (diceRoll !== 1) {
        this._activePlayer.currentScore += diceRoll;
      } else {
        this._activePlayer.currentScore = 0;
        this._switchActivePlayer();
      }
      this._emitPlayersUpdated();
    });
  }

  initGame() {
    this._setDefaultPlayersStatus();
    this._emitPlayersUpdated();
    this._isPlaying = true;
    this._activePlayer = this._player1;
  }

  private _setDefaultPlayersStatus() {
    this._player1 = {
      id: 1,
      name: 'Player 1',
      currentScore: 0,
      totalScore: 0,
      isActive: true,
      isWinner: false,
    };

    this._player2 = {
      id: 1,
      name: 'Player 1',
      currentScore: 0,
      totalScore: 0,
      isActive: false,
      isWinner: false,
    };
  }

  private _emitPlayersUpdated() {
    this.players$.next([this._player1, this._player2]);
  }

  private _switchActivePlayer() {
    this._activePlayer.isActive = false;
    this._activePlayer =
      this._activePlayer === this._player1 ? this._player2 : this._player1;
    this._activePlayer.isActive = true;
  }

  rollDice() {
    if (this._isPlaying) {
      const diceRoll = Math.trunc(Math.random() * 6) + 1;
      this._diceRoll$.next(diceRoll);
    }
  }

  holdScore() {
    this._activePlayer.totalScore += this._activePlayer.currentScore;
    this._activePlayer.currentScore = 0;

    if (this._activePlayer.totalScore >= 100) {
      this._activePlayer.isWinner = true;
      this._isPlaying = false;
    } else {
      this._switchActivePlayer();
    }
  }
}
