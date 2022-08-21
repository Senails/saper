import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createfields } from '../../utils/createfield';
import { checkWin } from '../../utils/checkwin';


type typeActionCheck={
    index1:number;
    index2:number;
}

export type Gamestate = {
    variant: number;
    bombcount:number;
    flagcount:number;
    statusgame: 'wait' | 'play' | 'end';
    field: string[][];
    statusfield: string[][];
    verdict: 'win'|'lose'|'';
    bomb:{ index1:number, index2:number} | null;
}

let initialState: Gamestate = {
    variant: 1,
    bombcount: 0,
    flagcount: 0,
    statusgame: 'wait',
    field: [[]],
    statusfield: [[]],
    verdict:'',
    bomb:null
}

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setVar(state , action: PayloadAction<number>){
            state.variant = action.payload;
        },
        startgame(state){
            state.statusgame = 'play';
            let {field , statusfield , bombcount} = createfields(state.variant);
            state.field = field;
            state.statusfield = statusfield;
            state.bombcount = bombcount;
            state.flagcount = 0;
            state.verdict='';
            state.bomb=null;
        },
        usingflag(state,action: PayloadAction<typeActionCheck>){
            if (state.statusgame!=='end'){
                let {index1 , index2} = action.payload;
                let status = state.statusfield[index1][index2]
                if (status!=='o'){
                    if (status==='s'){
                        state.statusfield[index1][index2]='z';
                        state.flagcount+=1;
                    }else{
                        state.statusfield[index1][index2]='s';
                        state.flagcount-=1;
                    }
                }

                if (checkWin(state)){
                    state.statusgame='end';
                    state.verdict='win';
                }
            }
        },
        checkfragment(state,action: PayloadAction<typeActionCheck> ){
            if (state.statusgame!=='end'){
                let num1 = state.field.length;
                let num2 = state.field[0].length;
                const ClicktoZero = (number1:number,number2:number):void=>{
                    if (state.statusfield[number1][number2]==='s'){
                        state.statusfield[number1][number2]='o';
                        if (state.field[number1][number2]===''){

                            for(let i=number1-1; i<=number1+1;i++){
                                for(let j=number2-1;j<=number2+1;j++){
            
                                    if ((i>=0 && j>=0) && (i<num1 && j<num2)){
                                        ClicktoZero(i,j)
                                    }
            
                                }
                            }
                        }
                    }
                } 
                // функции внутри потому что есть необходимость воспользоваться замыканием и рекурсией
                let {index1 , index2} = action.payload;
                if (state.statusfield[index1][index2]!=='z'){
                    if (state.field[index1][index2]==='b'){
                        state.statusfield[index1][index2]='o';
                        for(let i=0;i<num1;i++){
                            for(let j=0; j<num2; j++){
                                if (state.statusfield[i][j]!=='z'){
                                    state.statusfield[i][j]='o';
                                }
                            }
                        }
                        state.statusgame='end';
                        state.verdict='lose';
                        state.bomb = {index1,index2};
                    } else if (state.field[index1][index2]===''){
                        ClicktoZero(index1,index2)
                    } else if (state.statusfield[index1][index2]==='o'){
                        let count:number = +state.field[index1][index2];
                        let sumflag:number = 0;
                        for(let i=index1-1;i<=index1+1;i++){
                            for(let j=index2-1;j<=index2+1;j++){
                                if ((i>=0 && j>=0) && (i<num1 && j<num2)){
                                    if (state.statusfield[i][j]==='z'){
                                        sumflag++;
                                    }
                                }
                            }
                        }
                        if (count === sumflag){
                            for(let i=index1-1;i<=index1+1;i++){
                                for(let j=index2-1;j<=index2+1;j++){
                                    if ((i>=0 && j>=0) && (i<num1 && j<num2)){
                                        if (state.statusfield[i][j]!=='z'){
                                            if (state.field[i][j]==='b'){
                                                state.statusfield[index1][index2]='o';
                                                state.statusgame='end';
                                                state.verdict='lose';
                                                state.bomb = {index1:i,index2:j};
                                            }
                                            if (state.field[i][j]===''){
                                                ClicktoZero(i,j);
                                            }   
                                            state.statusfield[i][j]='o';
                                        }
                                    }
                                }
                            }
                        }

                 

                    }else{
                        state.statusfield[index1][index2]='o';
                    }
                    //end
                }

                if (checkWin(state)){
                    state.statusgame='end';
                    state.verdict='win';
                }
            }
        }
    },
  })

  export const { setVar, startgame, usingflag , checkfragment } = GameSlice.actions;
  export default GameSlice.reducer
