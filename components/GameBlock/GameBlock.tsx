import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkfragment, usingflag } from '../../redux/Slices/GameSlice'
import { RootState } from '../../redux/store'
import { MiniBlock } from '../miniblocks/MiniBlock'
import Verdict from '../Verdict/Verdict'
import style from './style.module.scss'




export default function Gameblock():JSX.Element{
    let field = useSelector((state:RootState)=> state.game.field);
    let gamebox = useRef<HTMLDivElement>();
    let dispatch = useDispatch();

    useEffect(()=>{
        let num1 = field.length;
        let num2 = field[0].length;
        gamebox.current.style.height=`${num1*30}px`;
        gamebox.current.style.width=`${num2*30}px`;
    },[field])

    function RightClickHandler(event:React.MouseEvent<HTMLDivElement>, index1:number , index2:number):void{
        event.preventDefault();
        dispatch(usingflag({index1,index2}))
    }
    function LeftClickHandler(index1:number , index2:number):void{
        dispatch(checkfragment({index1,index2}));
    }

    let res = field.map((arr, index1)=>{
          let res2 = arr.map((str,index2)=>{
            return <div 
            onClick={()=>LeftClickHandler(index1,index2)}
            onContextMenu={(event)=>RightClickHandler(event,index1,index2)} 
            className={style.minibox} key={index2}>
                <MiniBlock index1={index1} index2={index2}/>
            </div>
          })
        return <div className={style.stroka} key={index1}>
            {res2}
        </div>
    })

   // console.log('render')


    return <div ref={gamebox} className={style.gamebox}>
        <div className={style.conteiner}>
        {res}
        </div>
        <Verdict/>
    </div>
}