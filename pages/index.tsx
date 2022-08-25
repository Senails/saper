import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Gameblock from '../components/GameBlock/GameBlock';
import Topux from '../components/Topux/Topux'

import { setVar, startgame } from '../redux/Slices/GameSlice';
import { RootState } from '../redux/store';


import styles from './index.module.scss'


export default function App():JSX.Element {
    let {variant, statusgame} = useSelector((state: RootState)=>state.game)
    let [istouch , settouch] = useState<boolean>(false);

    let dispatch = useDispatch();
    let albox = useRef<HTMLDivElement>();
    let boxforgame = useRef<HTMLDivElement>();


    useEffect(()=>{
        //Если клиент сделал таб по сенсорному экрану то меняю стейт 
        //Если в стейте тру , то события мыши игнорируются что бы не мешали
        //Нужно что бы клики не дублировались
        //Сделано для работы на мобильном сафари , там не обработки "onContextMenu"
        window.addEventListener("touchstart", changetouch);
        function changetouch(){
            settouch(true);
            window.removeEventListener("touchstart", changetouch);
        }
        return ()=>{
            window.removeEventListener("touchstart", changetouch);
        }
    },[])


    const selecthandler = (num:number)=>{
        dispatch(setVar(num));
    }
    const startgamehandler= ()=>{
        dispatch(startgame());
    }

    let select = variant;
    let dopclass ='';
    if (statusgame!=='wait' && variant===3){
        dopclass=styles.forthreegame;
    }
    if (statusgame!=='wait' && variant===2){
        dopclass=styles.fortwogame;
    }


    return <>
    <div ref={albox} className={styles.allbox + ' ' + dopclass}>
        <Topux/>
        <div className={styles.conteiner+` ${statusgame!=='wait'?  styles.game : ''}`}>
            <div className={styles.firstslide}>
                <div className={styles.box}>
                    <div className={styles.img}></div>
                    <div className={styles.select}>
                        <div className={select==1 ? styles.active : ''} onClick={()=>selecthandler(1)}>8x8</div>
                        <div className={select==2 ? styles.active : ''} onClick={()=>selecthandler(2)}>16x16</div>
                        <div className={select==3 ? styles.active : ''} onClick={()=>selecthandler(3)}>30x16</div>
                    </div>
                    <h1 className={styles.button} onClick={startgamehandler}>Play</h1>
                </div>
                <div className={styles.aboutme}>
                    <a href="https://www.figma.com/file/9kKmWLx210GntuxqdihFbj/Untitled?node-id=0%3A1"><div></div></a>
                    <a href="https://github.com/Senails/saper"><div></div></a>
                    <a href="https://senails.github.io/Senails/"><div></div></a>
                </div>
            </div>
            <div className={styles.simplebox}></div>
            <div ref={boxforgame} className={styles.boxforgame}>
                {statusgame!=='wait' && <Gameblock istouch={istouch}/>}
            </div>
        </div>
    </div>
    </>
}

