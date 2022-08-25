import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkfragment, usingflag } from '../../redux/Slices/GameSlice'
import { RootState } from '../../redux/store'
import { MiniBlock } from '../miniblocks/MiniBlock'
import Verdict from '../Verdict/Verdict'
import style from './style.module.scss'

export default function Gameblock({istouch}):JSX.Element{
    let field = useSelector((state:RootState)=> state.game.field);
    let dispatch = useDispatch();

    let gamebox = useRef<HTMLDivElement>();

    useEffect(()=>{
        let num1 = field.length;
        let num2 = field[0].length;
        gamebox.current.style.height=`${num1*30}px`;
        gamebox.current.style.width=`${num2*30}px`;
        gamebox.current.style.top=`calc(50% - ${num1*30/2}px)`;
        gamebox.current.style.left=`calc(50% - ${num2*30/2}px)`;

    },[field])

    function RightClickHandler(event:React.MouseEvent<HTMLDivElement>, index1:number , index2:number):void{
        event.preventDefault();
        if (!istouch){
            dispatch(usingflag({index1,index2}));
            console.log('правый клик мыши');
        }
    }
    function LeftClickHandler(index1:number , index2:number):void{
        if (!istouch){
        dispatch(checkfragment({index1,index2}));
        console.log('левый клик мыши');
        }
    }
    function touchhandler(event:React.TouchEvent<HTMLDivElement>,index1:number,index2:number){
        let datestart = new Date();
        let startX = event.targetTouches[0].screenX;
        let startY = event.targetTouches[0].screenY;

        let box = event.target;

        box.addEventListener("touchend",touchend);
        box.addEventListener("touchmove",touchmove);

        function touchend(){
            let dateend = new Date();
            let difference = dateend.getTime()-datestart.getTime();

            if (difference<600){
                if (difference<100){
                    dispatch(checkfragment({index1,index2}));
                }else{
                    dispatch(usingflag({index1,index2}));
                }
            }

            box.removeEventListener("touchend",touchend);
            box.removeEventListener("touchmove",touchmove);
        }

        function touchmove(event:TouchEvent){
            let endtX = event.targetTouches[0].screenX;
            let endtY = event.targetTouches[0].screenY;

            let differentX = endtX - startX;
            let differentY = endtY - startY;

            let rexX = (differentX**2)**0.5;
            let rexY = (differentY**2)**0.5;

            let res = (rexX**2 + rexY**2)**0.5;

            if (res>=5){
                box.removeEventListener("touchend",touchend);
                box.removeEventListener("touchmove",touchmove);
            }
        }

    }

    let res = field.map((arr, index1)=>{
          let res2 = arr.map((str,index2)=>{
            return <div 
            onClick={()=>LeftClickHandler(index1,index2)}
            onContextMenu={(event)=>RightClickHandler(event,index1,index2)} 
            onTouchStart={(event)=>touchhandler(event,index1,index2)}
            className={style.minibox} key={index2}>
                <MiniBlock index1={index1} index2={index2}/>
            </div>
          })
        return <div className={style.stroka} key={index1}>
            {res2}
        </div>
    })

    return <div ref={gamebox} className={style.gamebox}>
        <div className={style.conteiner}>
        {res}
        </div>
        <Verdict/>
    </div>
}