
import styles from '../styles/Firework.module.scss'
import React from "react"
import { object } from "yup"


const Firework = () => {


    return (
        <>
            <div className={styles.wrap}>
                {Array.from(Array(20)).map((_, index) => (
                    <div key={index} className={styles[`pattern${index}`] + " " + styles["fireworks"] + " " + styles[`fire${index}`]}>
                        <div className={styles.ring_1}></div>
                        <div className={styles.ring_2}></div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Firework