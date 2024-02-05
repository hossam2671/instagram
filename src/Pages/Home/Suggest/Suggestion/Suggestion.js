import React from 'react'
import style from './Suggestion.module.css'
import profile from '../../../../assets/119986446_3340727139310180_8618841474764541280_n.jpg'

function Suggestion({name}) {
  return (
    <div className={style["suggest"]}>
        <div className={style["info"]}>
            <img src={profile} />
            <div className={style["name"]}>
                <h5>{name}</h5>
                <h5>Suggested for you</h5>
            </div>
        </div>
        <h5>Follow</h5>
    </div>
  )
}

export default Suggestion