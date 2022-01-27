$(document).ready(() => {
  
    let global = [];    
    let checked = [];

    function plantBomb(master, width, height) {
        let x = Math.floor(Math.random()*width)
        let y = Math.floor(Math.random()*height)
        if (master[x][y] === 0) {
            master[x][y] = 'B';
        };
        console.log(`plants at ${x}, ${y}`)
        
    }

    function checkEdges(evaluator, purpose, master, i, j, width, recur) {
        if (purpose === 'set') {
            let num = 0;
            if (i > 0) {
                if (j > 0) {
                    if (master[i - 1][j - 1] == evaluator) {
                        num += 1;
                    } 
                }
                if (j < width) {
                    if (master[i - 1][j + 1] == evaluator) {
                        num += 1;
                    } 
                }
                if (master[i - 1][j] == evaluator) {
                    num += 1;
                } 
            };
            if (i + 1 < master.length) {
                if (j > 0) {
                    if (master[i + 1][j - 1] == evaluator) {
                        num += 1;
                    } 
                }
                if (j < width) {
                    if (master[i + 1][j + 1] == evaluator) {
                        num += 1;
                    } 
                }
                if (master[i + 1][j] == evaluator) {
                    num += 1;
                } 
            };
            if (j > 0) {
                if (master[i][j - 1] == evaluator) {
                    num += 1;
                } 
            }
            if (j < width) {
                if (master[i][j + 1] == evaluator) {
                    num += 1;
                } 
            }
            return num;
        } else if (purpose === 'reveal') {
            let arr = recur;
            console.log(recur);
            if (master[i][j] === 0) {

            
            if (i > 0) {
                if (j > 0) {
                    if (master[i - 1][j - 1] !== evaluator && !arr.includes([i, j])) {
                        arr.push([i-1, j-1])
                    } 
                }
                if (j < width) {
                    if (master[i - 1][j + 1] !== evaluator && !arr.includes([i, j])) {
                        arr.push([i-1, j+1])
                    } 
                }
                if (master[i - 1][j] !== evaluator && !arr.includes([i, j])) {
                    arr.push([i-1, j])
                } 
            };
            if (i + 1 < master.length) {
                if (j > 0) {
                    if (master[i + 1][j - 1] !== evaluator  && !arr.includes([i, j])) {
                        arr.push([i+1, j-1])
                    } 
                }
                if (j < width) {
                    if (master[i + 1][j + 1] !== evaluator && !arr.includes([i, j])) {
                        arr.push([i+1, j+1])
                    } 
                }
                if (master[i + 1][j] !== evaluator && !arr.includes([i, j])) {
                    arr.push([i+1, j])
                } 
            };
            if (j > 0) {
                if (master[i][j - 1] !== evaluator && !arr.includes([i, j])) {
                    arr.push([i, j-1])
                } 
            }
            if (j < width) {
                if (master[i][j + 1] !== evaluator && !arr.includes([i, j])) {
                    arr.push([i, j+1])
                } 
            }
            // arr.forEach(tuple => {
            //     if (global[tuple[0]][tuple[1]] === 0 && !recur.includes([tuple[0], tuple[1]])) {
            //         checkEdges('B', 'reveal', master, tuple[0], tuple[1], width, arr)
            //     }
            // })
            console.table(global);
            return arr;

            } else {
                arr.push([i, j]);
                return arr
            }
        }
        
    }

    $('#start').on('click', (e) => {
        e.preventDefault();

        let bombs = $('#bombs').val();
        let width = $('#width').val();
        let height = $('#height').val();
        const board = $('#board')
        
        board.attr('style', `width: ${width * 30}px; height: ${height * 30}px; border: solid black 3px;`);
        
        let master = [];
        for (let i = 0; i < height; i++) {
            let arr = [];
            for (let i = 0; i < width; i++) {
                arr.push(0);
            };
            master.push(arr);
            checked.push([]);
        }
        
        

        

        for (let i = 0; i < bombs; i++) {
            plantBomb(master, width, height);
        }

        
        
        for (let i = 0; i < width; i++) {
            
            for (let j = 0; j < height; j++) {
                let val = checkEdges('B', 'set', master, i, j, width)

                if (master[i][j] !== 'B') {
                    master[i][j] = val
                }
                board.append(`<span class="square unclicked" id="${i}-${j}">${master[i][j]}</span>`)
            }
            
        }
        global = master;
    })

    $('#board').on('click', 'span', (e) => {
        let bombs = $('#bombs').val();
        let width = parseInt($('#width').val(), 10);
        let height = $('#height').val();
        e.preventDefault();
        let id = $(e.target).attr('id');
        let coords = id.split('-').reverse();
        // console.table(global);
        // console.log(coords);
        checked[x][y] = 1;
        console.table(checked);
        let y = parseInt(coords[0], 10);
        let x = parseInt(coords[1], 10);
        
        if (global[x][y] === 'B') {
            $(e.target).addClass('red')
        } else if (global[x][y] === 0) {
            let arr = checkEdges('B', 'reveal', global, x, y, width, []);
            // console.log(arr);
        } else {
            $(e.target).addClass('green');
            
        }



        
    })

});

