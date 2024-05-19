import { Component, OnInit } from '@angular/core';
import { Player } from './models/player.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  diceRoll = 0;
  showDice = false;
  players: Player[] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _gameService: GameService) {}

  ngOnInit(): void {
    this.initGame();

    this._gameService.diceRoll
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((diceRoll) => {
        this.diceRoll = diceRoll;
        this.showDice = diceRoll !== 0;
      });

    this._gameService.players$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((players) => (this.players = players));
  }

  initGame() {
    this._gameService.initGame();
  }

  rollDice() {
    this._gameService.rollDice();
  }

  holdScore() {
    this._gameService.holdScore();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
