import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import style from './style.module.scss'

export default function Verdict(){
    let verdict = useSelector((state:RootState)=>state.game.verdict);
    if (verdict!=='win'){
        return
    }
    return <div className={style.win}>
    </div>
}