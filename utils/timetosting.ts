export function timeTostring(num){
    let h =''+Math.floor(num/3600);
    let num1 = num%3600;
    let m =''+Math.floor(num1/60)
    let s =''+num1%60;

    h.length===1?h=0+h :h=h;
    m.length===1?m=0+m :m=m;
    s.length===1?s=0+s :s=s;

    let string = (h!=='00'?h+':':'')+m+':'+s;
    return string;
}