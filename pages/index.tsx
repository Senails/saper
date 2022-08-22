import { useCallback, useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Gameblock from '../components/GameBlock/GameBlock';
import Topux from '../components/Topux/Topux'

import { setVar, startgame } from '../redux/Slices/GameSlice';
import { RootState } from '../redux/store';


import styles from './index.module.scss'


export default function App():JSX.Element {
    let {variant, statusgame} = useSelector((state: RootState)=>state.game)
    let dispatch = useDispatch();
    let albox = useRef<HTMLDivElement>()


    const selecthandler = (num:number)=>{
        dispatch(setVar(num));
    }
    const startgamehandler= ()=>{
        dispatch(startgame());
    }

    let select = variant;

    useEffect(()=>{
        let height = window.innerHeight;
        albox.current.style.height = height-1+'px';

        window.addEventListener('resize',resise);

        function resise(){
            let height = window.innerHeight;
            albox.current.style.height = height-1+'px';
        }


        return ()=>{
            window.removeEventListener('resize',resise);
        }
    },[]);



    return <>
    <div ref={albox} className={styles.allbox}>
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
            </div>
            <div className={styles.simplebox}></div>





            <div className={styles.boxforgame}>
                {statusgame!=='wait' && <Gameblock/>}
            </div>
        </div>
    </div>
    </>
}

