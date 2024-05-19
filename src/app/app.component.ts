import { Component, OnInit } from '@angular/core';
import { Player } from './models/player.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  diceRoll$ = new BehaviorSubject<number | null>(null);
  showDice = false;
  private _unsubscribe$ = new Subject<void>();

  isPlaying = false;
  private _activePlayer!: Player;

  player1!: Player;
  player2!: Player;

  ngOnInit(): void {
    this.initGame();

    this.diceRoll$.pipe(takeUntil(this._unsubscribe$)).subscribe((diceRoll) => {
      if (!diceRoll) return;

      this.showDice = true;
      if (diceRoll !== 1) {
        this._activePlayer.currentScore += diceRoll;
      } else {
        this._activePlayer.currentScore = 0;
        this._switchActivePlayer();
      }
    });
  }

  initGame() {
    this._setDefaultPlayersStatus();
    this.isPlaying = true;
    this.showDice = false;
    this._activePlayer = this.player1;
  }

  private _setDefaultPlayersStatus() {
    this.player1 = {
      id: 1,
      name: 'Player 1',
      currentScore: 0,
      totalScore: 0,
      isActive: true,
      isWinner: false,
    };

    this.player2 = {
      id: 2,
      name: 'Player 2',
      currentScore: 0,
      totalScore: 0,
      isActive: false,
      isWinner: false,
    };
  }

  rollDice() {
    if (this.isPlaying) {
      const diceRoll = Math.trunc(Math.random() * 6) + 1;
      this.diceRoll$.next(diceRoll);
    }
  }

  private _switchActivePlayer() {
    this._activePlayer.isActive = false;
    this._activePlayer =
      this._activePlayer === this.player1 ? this.player2 : this.player1;
    this._activePlayer.isActive = true;
  }

  holdScore() {
    this._activePlayer.totalScore += this._activePlayer.currentScore;
    this._activePlayer.currentScore = 0;

    if (this._activePlayer.totalScore >= 100) {
      this._activePlayer.isWinner = true;
      this.isPlaying = false;
      this.showDice = false;
    } else {
      this._switchActivePlayer();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
