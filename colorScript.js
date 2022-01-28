let colorArr = [];

let arr = ['0','1','2','3','4','5','6','7',"8","9",'A','B','C','D','E','F']
for (let i = 0; i < 100; i++) {
    let strArr = [];
    for (let j = 0; j < 6; j++) {
        let num = Math.floor(Math.random()*16);
        strArr.push(arr[num])
    };
    let string = strArr.join('');
    colorArr.push(string);
};

console.table(colorArr)
function getColors() { 
    // for (let i = 0; i < 16; i++) {
    //    let randomNumber = Math.random() * 1000000;
    //     let string = randomNumber.toString(16);
    //     let number = parseInt(string, 16)

    //     colorArr.push(number); 
    // }
    
    
   
    for (let i = 0; i < 1000; i++) {
        // if (i %8 === 0) {
        //     $('#container').append(`<div class="container"></div>`)
        // }
        
        $('#container').append(`<div style="background-color: #${colorArr[Math.floor(i % 8)]}; width: 20px; height: 20px;" ></div>`)   
    }
}

getColors();



