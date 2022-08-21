import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { timeTostring } from '../../utils/timetosting';
import styles from './style.module.scss'

let memoryfortimer: NodeJS.Timer;
let time = 0;

export default function TopUI():JSX.Element{
    let gamesatus = useSelector((state: RootState)=>state.game.statusgame);
    let bombcount = useSelector((state: RootState)=>state.game.bombcount);
    let flagcount = useSelector((state: RootState)=>state.game.flagcount);
    let timer = useRef<HTMLParagraphElement>();

    let dopclass='';
    if (gamesatus!=='wait') dopclass=styles.active;

    useEffect(()=>{
        if (gamesatus==='play'){
            timer.current.innerHTML='00:00';
            time=0;
            memoryfortimer = setInterval(()=>{
                timer.current.innerHTML=timeTostring(time);
                time++;
            },1000);
        }else{
            clearInterval(memoryfortimer);
        }
        return ()=>{
            clearInterval(memoryfortimer);
        }
    },[gamesatus]);


    return <div className={styles.toppanel+' '+dopclass}>
        <div>
            <div className={styles.bombimg}></div>
            <p>{bombcount - flagcount}</p>
        </div>
        <div>
            <p ref={timer}>00:00</p>
        </div>
    </div>
}