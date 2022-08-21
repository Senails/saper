import { Gamestate } from "../redux/Slices/GameSlice";

export function checkWin(state:Gamestate):boolean{
    let {bombcount , flagcount , field , statusfield } = state;
    if (bombcount!==flagcount){
        return false;
    }

    let num1 = field.length;
    let num2 = field[0].length;
    let rightFlagBomb = 0;

    for(let i=0; i<num1;i++){
        for(let j=0;j<num2;j++){
            if (statusfield[i][j]==='z' && field[i][j]==='b'){
                rightFlagBomb++
            }
        }
    }
    if (rightFlagBomb!==bombcount){
        return false;
    }

    let checkedFragmentcount=0;
    for(let i=0; i<num1;i++){
        for(let j=0;j<num2;j++){
            if (statusfield[i][j]==='o' || statusfield[i][j]==='z'){
                checkedFragmentcount++;
            }
        }
    }
    if (checkedFragmentcount !== num1*num2){
        return false;
    }

    return true;
}