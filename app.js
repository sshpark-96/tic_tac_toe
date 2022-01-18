let players = ()=>{
    player1 = "X";
    player2 = "O";
}

let gameboard = (()=>{
    let board = [9];
    let game_board = document.querySelector('div.gameboard');

    board.forEach((section, index) => {
        let panels = document.createElement('div');
        panels.setAttribute("panel_num", index);
        game_board.appendChild(panels);
    });
    
})();
