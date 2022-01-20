let Players = (player, panels_played, player_mark)=>{
    let play_made = (panel_id)=>{
        panels_played.push(panel_id);
    }
    return {player, panels_played, player_mark, play_made};
}

let Game = () =>{
    let player1 = Players(1, [], "O");
    let player2 = Players(1, [], "X");
    let player1_turn = true;
    let game_finished = false;
    const panels = document.querySelectorAll('div.panel');
    let win_condition = [[0,1,2], 
                         [3,4,5], 
                         [6,7,8],
                         [0,3,6], 
                         [1,4,7], 
                         [2,5,8],
                         [0,4,8], 
                         [2,4,6]];
    let current_player = player1;

    let game = ()=>{
        play();
        win();
        // win(current_player.panels_played) ? game_finished = true : game_finished = false;
    }

    let play = (player) =>{
        panels.forEach(panel=>{
            panel.addEventListener('click', ()=>{
                console.log(current_player);
                console.log(current_player.player_mark);
                panel.textContent = current_player.player_mark;
                current_player.panels_played.push(parseInt(panel.getAttribute("data-id")));
                player1_turn = !player1_turn
                player1_turn ? current_player = player1 : current_player = player2;
                win() ? game_finished = true : game_finished = false;
                console.log(game_finished);
            });
        });
    }

    let win = ()=>{
        win_condition.forEach((win) => {
            console.log("checking for " + current_player.player + ": " + win);
            console.log(win.every(id => current_player.panels_played.indexOf(id) > -1))
            return win.every(id => current_player.panels_played.indexOf(id) > -1);
        });
    }

    return{game, game_finished}
}

let new_game = Game();

new_game.game();



/*
What I want it to do:
Display user's turn
When panel is clicked, leave current user's mark and check if win
If not win, next player's turn
if win, displa win message and give option to play again
*/