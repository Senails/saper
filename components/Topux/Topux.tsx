import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { exitgame, startgame } from '../../redux/Slices/GameSlice';
import { RootState } from '../../redux/store'
import { timeTostring } from '../../utils/timetosting';
import styles from './style.module.scss'

let memoryfortimer: NodeJS.Timer;
let time = 0;

export default function TopUI():JSX.Element{
    let gamesatus = useSelector((state: RootState)=>state.game.statusgame);
    let bombcount = useSelector((state: RootState)=>state.game.bombcount);
    let flagcount = useSelector((state: RootState)=>state.game.flagcount);
    let dispatch = useDispatch();
    
    let timer = useRef<HTMLParagraphElement>();
    let restart = useRef<HTMLDivElement>()

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

    const restartgamehandler = ()=>{
        dispatch(startgame());
        restart.current.classList.add(styles.active);
        time = 0;
        setTimeout(()=>{
            restart.current.classList.remove(styles.active)
        },500);
    }

    const exitgamehandler = () =>{
        dispatch(exitgame());
    }


    return <div className={styles.toppanel+' '+dopclass}>
        <div>
            <div className={styles.bombimg}></div>
            <p>{bombcount - flagcount}</p>
        </div>
        <div>
            <p ref={timer}>00:00</p>
        </div>

        <div onClick={exitgamehandler} className={styles.exit}></div>
        <div ref={restart} onClick={restartgamehandler} className={styles.restart}></div>

    </div>
}

