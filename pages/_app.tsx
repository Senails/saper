import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import './globalstyle.css'

type ForProps ={
  Component:React.FunctionComponent,
  pageProps:any
}

export default function MyApp({ Component, pageProps }:ForProps):JSX.Element {
  return <>
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  </>

}