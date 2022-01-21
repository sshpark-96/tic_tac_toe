let Players = (player, panels_played, player_shape)=>{
    let game_finished = false;
    let win_condition = [[0,1,2], 
                         [3,4,5], 
                         [6,7,8],
                         [0,3,6], 
                         [1,4,7], 
                         [2,5,8],
                         [0,4,8], 
                         [2,4,6]];

    let play_made = (panel_id) =>{
        panels_played.push(panel_id);
    }

    let win = () =>{
        win_condition.forEach((win, index) => {
            if(win.every(pos => (panels_played.includes(pos)))){
                game_finished = true;
            }
        })
        return game_finished;
    }
    return {player, panels_played, player_shape, play_made, win};
}


let Game = () =>{
    let player1 = Players("Player 1", [], "〇");
    let player2 = Players ("Player 2", [], "✖");
    let player1_turn = true;
    const panels = document.querySelectorAll("div.panel");
    const message = document.querySelector("div.message");
    const text = document.querySelector("p.text");
    let current_player = player1;

    let play = () =>{
        panels.forEach(panel => {
            panel.addEventListener('click', ()=>{
                panel.textContent = current_player.player_shape;
                panel_id = parseInt(panel.getAttribute("data-id"));
                current_player.play_made(panel_id);
                panel.classList.add("picked");
                if(current_player.win()){
                    endGame();
                    playAgain();
                }else{
                    if (current_player.panels_played.length > 4){
                        noWin();
                        playAgain();
                    } else {
                        endTurn();
                    }
                } 
                
                
            })
        })
    }

    let endTurn = () =>{
        player1_turn = !player1_turn;
        player1_turn ? current_player = player1 : current_player = player2;
        text.textContent = current_player.player_shape + "'s Turn";
    }

    let endGame = () =>{
        text.textContent = current_player.player_shape + "  Wins!";
    }

    let noWin = ()=>{
        text.textContent = "Draw!"
    }

    let playAgain = ()=>{
        panels.forEach(panel => {
            if(panel.classList.contains("unpicked")){
                panel.classList.add("picked");
                panel.classList.remove("unpicked");
            }
        })
        let play_again = document.querySelector('button');
        play_again.classList.remove("hidden");
        document.querySelector('button').addEventListener('click', ()=>{
            play_again.classList.add("hidden");
            player1 = Players("Player 1", [], "〇");
            player2 = Players ("Player 2", [], "✖");
            player1_turn = true;
            current_player = player1;
            text.textContent = "〇 Starts Game";
            panels.forEach(panel=>{
                panel.textContent = "";
                panel.classList.remove("picked");
                panel.classList.add("unpicked");
            })
        })
    }

    return {play};
}

let new_game = Game();
new_game.play();



