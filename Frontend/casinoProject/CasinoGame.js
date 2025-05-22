randomNumber = () => {
    let number = Math.floor(Math.random()*3)
    return number;
}

let letterArr = ["*","#","$"]
let startingBalance = 100;

generateRandomArr = () => {
    let arr = [];
    for(let i=0; i<3; i++){
        arr[i] = letterArr[randomNumber()];
    }
    return arr
}

multiplierCheck = (arr) => {
    if(arr[0] == "*") {
        startingBalance*=2;
        return 2;
    }
    else if (arr[0] == "#") {
        startingBalance *= 5
        return 5;
    }else {
        startingBalance *=10
        return 10;
    }
}


displayStats = (a,b,c) => {
    let rowsWon = 0;
    let multipler;
    let won = false;
    if(a[0] == a[1] && a[1]==a[2]){
        won = true;
        rowsWon++;
        multipler=multiplierCheck(a)
    }
    if(b[0] == b[1] && b[1]==b[2]) {
        won = true
        rowsWon++;
        multipler=multiplierCheck(b)
    }
    if(c[0] == c[1] && c[1]==c[2]) {
        won = true
        rowsWon++;   
        multipler = multiplierCheck(c)
    }

    console.log(`${a[0]} | ${a[1]} | ${a[2]}`)
    console.log(`${b[0]} | ${b[1]} | ${b[2]}`)
    console.log(`${c[0]} | ${c[1]} | ${c[2]}`)
    if(won){
        console.log(`!!!!!!!!!!!!!!!!!!!YOU WON A ${multipler}X lOTTERY!!!!!!!!!!!!!!!!!`)
    }else{
        console.log("!!!!!!!!!!!!!!!!!!! YOU DID NOT WIN ANYTHING!!!!!!!!!!!!!!!!!!!!!!!")
    }
    
    console.log(`You won ${rowsWon} rows.`)
    console.log(`YOUR BALANCE = $${startingBalance}`)

    
}

runCasino = () => {
    startingBalance -= 40;
    let arr1 = generateRandomArr();
    let arr2 = generateRandomArr();
    let arr3 = generateRandomArr();

    displayStats(arr1,arr2,arr3)
}

runCasino()