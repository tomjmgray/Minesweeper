$(document).ready(() => {
  
    let global = [];    
    let checked = [];
    let doubleCheck = [];
    let intervalVar;
    // let centSec = 0;
    let sec = 0;
    let min = 0;
    let flag = 'Off';
    let flagCounter = 0;
    let mode = 'easy'

    let flagIcon = `<?xml version="1.0" encoding="utf-8"?>
   
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="flagIcon">
    
    <g id="XMLID_1_">
        <path id="XMLID_4_" class="st0" d="M378.3,35.7c0,0-84.9,40.9-170.6,11C114.9,14.5,73.2,27,33.1,75.8c-7.1-3.9-15.7-3.9-22.8,0
            C0.1,82.1-3.1,96.2,3.2,106.5l225.7,366.4c3.9,7.1,11.8,10.2,18.9,10.2c3.9,0,7.9-0.8,11.8-3.1c10.2-6.3,13.4-20.4,7.1-30.7
            l-99.1-162c39.3-48,81.8-61.3,173.8-29.1c84.9,29.9,170.6-11,170.6-11L378.3,35.7z"/>
    </g>
    </svg>`

    let bombIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" class="bombIcon">
    <g>
      <path d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"/>
      <path d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"/>
      <path d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"/>
      <path d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"/>
      <path d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"/>
      <path d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"/>
    </g>
  </svg>
  `

    function plantBomb(master, width) {
        let x = Math.floor(Math.random()*width)
        let y = Math.floor(Math.random()*width)
        if (master[x][y] === 0) {
            master[x][y] = 'B';
        } else {
            plantBomb(master, width);
        };
       
        
    }

    function start() {
        let bombs = $('#bombs').val();
        let width = $('#width').val();
        
        const board = $('#board')
        
        
        let master = [];
        for (let i = 0; i < width; i++) {
            let arr = [];
            for (let j = 0; j < width; j++) {
                arr.push(0);
            };
            master.push(arr);
            checked.push([]);
        }
        
        

        

        for (let i = 0; i < bombs; i++) {
            plantBomb(master, width);
        }

        
        let squareWidth = ((750 / width) - 2).toString();
        

        for (let i = 0; i < width; i++) {
            
            for (let j = 0; j < width; j++) {
                let val = checkEdges('B', 'set', master, i, j, width)

                if (master[i][j] !== 'B') {
                    master[i][j] = val
                }
                board.append(`<span class="square unclicked" id="${i}-${j}" style="width:${squareWidth}px; height:${squareWidth}px; padding:-1px;"></span>`)
            }
            
        }
        global = master;
        
        intervalVar = setInterval(()=> {
            
            sec += 1;
            
            if (sec === 60) {
                sec -= 60;
                min += 1;
                
            };
            $('#sec').text(sec);
            $(`#min`).text(min);
            // $('#centSec').text(centSec)
        }, 1000);

        $('#start').addClass('hidden');
        $('#flag').removeClass('hidden');
        $('#restart').removeClass('hidden');
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
            let coordsStr = `${i}-${j}`;
            if (doubleCheck?.includes(coordsStr)) {
                return arr
            } else {
                doubleCheck.push(coordsStr);
            }
            if (global[i][j] === 0) {
            checked[i][j] = 1;
            
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
            arr.forEach(tuple => {
                /// Checks if its a number, adds to checked
                if (global[tuple[0]][tuple[1]] !== 0 && global[tuple[0]][tuple[1]] !== 'B' && checked[tuple[0]][tuple[1]] !== 1) {
                    checked[tuple[0]][tuple[1]] = 1;
                } else if ((global[tuple[0]][tuple[1]] === 0) && (checked[tuple[0]][tuple[1]] !== 1)) {
                    checkEdges('B', 'reveal', master, tuple[0], tuple[1], width, arr)
                }
            })

            return arr;

            } else if (master[i][j] !== evaluator) {
                arr.push([i, j]);
                return arr
            } else {
                return arr
            }
        }
        
    }

    $('#start').on('click', (e) => {
        e.preventDefault();

        start();
    })

    $('#board').on('click', 'span', (e) => {
        let bombs = $('#bombs').val();
        let width = parseInt($('#width').val(), 10);
        console.log(flagCounter);
        e.preventDefault();
        
        if (flag === 'On') {
             if ($(e.target).hasClass('flagIcon')) {
                $(e.target).parent().removeClass('flagged')
                $(e.target).parent().empty()
                flagCounter -= 1;
            } else if ($(e.target).hasClass('flagged')) {
                $(e.target).removeClass('flagged')
                $(e.target).parent().empty()
                flagCounter -= 1;
            }else {
                if ($(e.target).hasClass('unclicked')) {
                        $(e.target).addClass('flagged').append(flagIcon);
                    flagCounter += 1;
                    let bombCounter = 0;
                    if (flagCounter == bombs) {
                        for (let i = 0; i < width; i++) {
                            for (let j = 0; j < width; j++) {
                                if (global[i][j] === 'B' && $(`#${i}-${j}`).hasClass('flagged')) {
                                    bombCounter += 1;
                                } 
                            }
                        }
                    };
                    if (bombCounter === flagCounter) {
                        clearInterval(intervalVar);
                        $('.board-cont').prepend(`<h2 id="loser">You win! Your time was ${min} minutes, ${sec}.${centSec} seconds! </h2>`)
                    }
                }
                
            }
            
        } else {
            let id = $(e.target).attr('id');
            let coords = id.split('-').reverse();
            
            

            let y = parseInt(coords[0], 10);
            let x = parseInt(coords[1], 10);
            
            checked[x][y] = 1;
            console.table($(e.target));
            if (!$(e.target).hasClass('flagged')) {

                /// Handles clicking a bomb and losing

                if (global[x][y] === 'B') {
                    $(e.target).addClass('red');
                    global.forEach((arr, xI) => {
                        arr.forEach((index, yI) => {
                            if (index === 'B') {
                                let string = "#"+xI.toString()+"-"+yI.toString();
                                $(string).addClass("red").append(bombIcon)
                            } else {
                                let string = "#"+xI.toString()+"-"+yI.toString();
                                $(string).addClass("green")
                            }
                        })  
                    });
                    clearInterval(intervalVar);
                    $('.board-cont').prepend('<h2 id="loser">You LOSE! Good day sir!</h2>')
                    
                /// Handles clicking a 0
                } else if (global[x][y] === 0) {
                    checkEdges('B', 'reveal', global, x, y, width, []);
                    checked.forEach((arr, xI) => {
                        arr.forEach((index, yI) => {
                            if (index === 1 &&  global[xI][yI] !== 'B') {
                                let string = "#"+xI.toString()+"-"+yI.toString();
                                $(string).removeClass('unclicked')
                            }
                            if (global[xI][yI] !== 0 && global[xI][yI] !== 'B') {
                                let string = "#"+xI.toString()+"-"+yI.toString();
                                $(string).addClass(global[xI][yI]).text(global[xI][yI])
                            }
                        })  
                    })
                } else {

                /// Adds class for color of Number tiles
                    let className = '';
                    if (global[x][y] === 1) {
                        className = 'color1'
                    } else if (global[x][y] === 2) {
                        className = 'color2'
                    } else if (global[x][y] === 3) {
                        className = 'color3'
                    } else if (global[x][y] === 4) {
                        className = 'color4'
                    } else if (global[x][y] === 5) {
                        className = 'color5'
                    } else if (global[x][y] === 6) {
                        className = 'color6'
                    } else if (global[x][y] === 7) {
                        className = 'color7'
                    } else if (global[x][y] === 8) {
                        className = 'color8'
                    }
                    
                    $(e.target).addClass().removeClass('unclicked').text(global[x][y]);
                    
                }
               
            }
                
        }  
    })

/// Handles Restart

    $('#restart').on('click',  (e)=> {
        centSec = 0;
        sec = 0;
        min = 0;
        $('#board').empty();
        $('#loser').remove();
        $('#flag').removeClass('on');
        global.length = 0;
        checked.length = 0;
        doubleCheck.length = 0;
        flagCounter = 0;
        flag='Off';
        start();
    })

/// Handles Modes

    $('#easy').on('click', () => {
        $('#width').val(10)
        $('#bombs').val(10)
        $('#easy').addClass('on');
        $('#medium').removeClass('on');
        $('#hard').removeClass('on');
        $('#insane').removeClass('on');
        mode = easy;
    })
    $('#medium').on('click', () => {
        $('#width').val(20)
        $('#bombs').val(40)
        $('#easy').removeClass('on');
        $('#medium').addClass('on');
        $('#hard').removeClass('on');
        $('#insane').removeClass('on');
        mode = medium;
    })
    $('#hard').on('click', () => {
        $('#width').val(30)
        $('#bombs').val(400)
        $('#easy').removeClass('on');
        $('#medium').removeClass('on');
        $('#hard').addClass('on');
        $('#insane').removeClass('on');
        mode = hard;
    })
    $('#insane').on('click', () => {
        $('#width').val(50)
        $('#bombs').val(1000)
        $('#easy').removeClass('on');
        $('#medium').removeClass('on');
        $('#hard').removeClass('on');
        $('#insane').addClass('on');
        mode = insane;
        r = document.querySelector(':root')
        
            r.style.setProperty('--background', 'black');
            r.style.setProperty('--font', 'red');
            r.style.setProperty('--banner', 'black');
            // r.style.setProperty('--light', 'black');
        
    })

/// Handles Color Picket

    $('#color-picker').on('click', 'button', (e) => {
        e.preventDefault();
        let id = $(e.target).attr('id');
        r = document.querySelector(':root')
        if (id === 'Default') {
            r.style.setProperty('--background', 'white');
            r.style.setProperty('--font', 'black');
            r.style.setProperty('--banner', 'rgba(192 192 192)');
        } else if (id === 'Dark') {
            r.style.setProperty('--background', '#222831');
            r.style.setProperty('--font', '#EEEEEE');
            r.style.setProperty('--banner', '#393E46');
        } else if (id === 'Night') {
            r.style.setProperty('--background', '#041C32');
            r.style.setProperty('--font', '#ECB365');
            r.style.setProperty('--banner', '#04293A');
        } 
        else if (id === 'Random') {
            let colorArr = [];

            let arr = ['0','1','2','3','4','5','6','7',"8","9",'A','B','C','D','E','F']
            for (let i = 0; i < 3; i++) {
                let strArr = [];
                for (let j = 0; j < 6; j++) {
                    let num = Math.floor(Math.random()*16);
                    strArr.push(arr[num])
                };
                let string = strArr.join('');
                colorArr.push(string);
            };
            r.style.setProperty('--background', `#${colorArr[0]}`);
            r.style.setProperty('--font', `#${colorArr[1]}`);
            r.style.setProperty('--banner', `#${colorArr[2]}`);
        } 
    })

/// Handles Flag Button

    $('#flag').on('click', (e) => {
        if (flag === 'Off') {
            flag = 'On'
            $(e.target).addClass('on');
        } else {
            flag = 'Off'
            $(e.target).removeClass('on');
        }
    })

});

