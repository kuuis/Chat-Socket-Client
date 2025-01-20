import React, { useState } from "react";
import { Link } from "react-router-dom"
import styles from "../styles/Main.module.css";

import cat1 from "../images/cute-cat-1.svg"
import cat2 from "../images/cute-cat-2.svg"

const FIELDS = {
    NAME: "name", 
    ROOM: "room"
}

const Main =  () => {
    const { NAME, ROOM } = FIELDS;

    const [values, setValues] = useState({[NAME]: "", [ROOM]: ""});

    const handleChange = ( {target: {value, name}} ) => {
        setValues({...values, [name]: value});

    };



const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if(isDisabled) e.preventDefault();
}
    return (
        <div className={styles.wrapper}>
            {/* Cat Images */}
            <img src={cat1} alt="Cute Cat 1" className={styles.cat1} />
            <img src={cat2} alt="Cute Cat 2" className={styles.cat2} />

            <div className={styles.container}>
                <h1 className={styles.heading}>Join</h1>

                <form className={styles.form}>
                    <div className={styles.group}>
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="username"
                        id="" 
                        value={values[NAME]}
                        className={styles.input} 
                        onChange={handleChange}
                        autoComplete="off"
                        required />
                     
                    </div>
                    <div className={styles.group}>
                        <input 
                        type="text" 
                        name="room" 
                        placeholder="room"
                        id="" 
                        value={values[ROOM]} 
                        className={styles.input} 
                        autoComplete="off"
                        onChange={handleChange} 
                        required/>
                        
                    </div>

                    <Link 
                        className={styles.group}
                        onClick={handleClick}
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
                            <button type="submit" className={styles.button}>
                                Sign In
                            </button>
                    </Link>
                </form>
            </div>
        </div>
    )
};

export default Main;

