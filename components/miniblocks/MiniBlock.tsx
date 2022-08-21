import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import style from './style.module.scss'

type Propstype ={
    index1:number,
    index2:number
}

export function MiniBlock({index1 , index2}:Propstype):JSX.Element{
    let fragment = useSelector((state:RootState)=>state.game.field[index1][index2]);
    let status = useSelector((state:RootState)=>state.game.statusfield[index1][index2]);
    let statusgame = useSelector((state:RootState)=>state.game.statusgame);
    let lastbom = useSelector((state:RootState)=>state.game.bomb);

    let lastbombclass='';
    if (lastbom?.index1===index1 && lastbom?.index2===index2) lastbombclass=style.lastbomb;
    
    if (status!=='o'){
        return <div className={style[`secret${status}`]}></div>
    }else{
    if (fragment!=='b'){
        return <div className={style[`number${fragment}`]}>{fragment}</div>
    }
    return <div className={style.bomb+' '+lastbombclass}></div>
    }
}


