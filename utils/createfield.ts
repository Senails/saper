
type ReturnType ={
    field:string[][];
    statusfield:string[][];
    bombcount:number;
}


export function createfields(select:number):ReturnType {
    let arr = [
        {num1:8,num2:8,bomb:10},
        {num1:16,num2:16,bomb:40},
        {num1:16,num2:30,bomb:99}
    ];

    let {num1 , num2 , bomb} = arr[select-1];
    let Arr = createarray(num1,num2,'');

    for(let i=0;i<bomb;i++){
        placebomb()
    }

    placenumber()

    let statusfield = createarray(num1,num2,'s');

    let firstzero = findrandomzero();

    firstclick(firstzero[0],firstzero[1])

    return {field: Arr , statusfield , bombcount:bomb}

    function createarray(num1:number,num2:number,str:string): Array<string>[]{
        let Arr = [];
        for(let i = 0; i < num1 ; i++){
            let arr = []
            for(let j = 0; j < num2; j++){
                arr.push(str)
            }
            Arr.push(arr)
        }
        return Arr
    }

    function randnumber():number[]{
        let num11 = Math.floor(Math.random()*num1);
        let num22 = Math.floor(Math.random()*num2);
        return [num11, num22];
    }

    function placebomb():void{
        let [num1, num2] = randnumber();
         if (Arr[num1][num2]!=='b'){

            Arr[num1][num2] = 'b'

        }else{
            placebomb()
        }
    }

    function checkbomb(number1:number,number2:number):boolean{
        if (number1<0 || number2<0){
            return false;
        }else if (number1>=num1 || number2>=num2){
            return false;
        }else if (Arr[number1][number2]!=='b'){
            return false;
        }else{
            return true;
        }
    }

    function getnumber(number1:number,number2:number):string{
        let a = number1-1;
        let b = number2-1;
        let sum = 0;

        for(let i = a; i<=number1+1; i++){
            for(let j=b; j<=number2+1;j++){
                if (checkbomb(i,j)){
                    sum++;
                }
            }
        }

        let res;
        if (sum === 0) {
            res = '';
        }else{
            res = ''+sum;
        }

        return res;
    }

    function placenumber():void{
        for(let i=0;i<num1;i++){
            for(let j=0; j<num2;j++){
                if (Arr[i][j]!=='b'){
                    let res = getnumber(i,j);
                    Arr[i][j] = res;
                }
            }
        }

    }

    function findrandomzero():number[]{
        let [num1, num2] = randnumber();
        if (Arr[num1][num2]===''){
            return [num1, num2];
        }else{
            return findrandomzero();
        }
    }

    function firstclick(number1,number2):void{
        if (statusfield[number1][number2]==='s'){
            statusfield[number1][number2]='o';
            if (Arr[number1][number2]===''){
                for(let i=number1-1; i<=number1+1;i++){
                    for(let j=number2-1;j<=number2+1;j++){

                        if ((i>=0 && j>=0) && (i<num1 && j<num2)){
                            firstclick(i,j)
                        }

                    }
                }
            }
        }
    }

}
 

