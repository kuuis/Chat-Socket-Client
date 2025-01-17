import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {useLocation, useNavigate} from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";


import styles from "../styles/Chat.module.css";


const socket = io.connect("http://localhost:5000");

const Chat =  () => {
    const { search } = useLocation(); 
    const navigate = useNavigate();
    const [params, setParams] = useState({ room: "", user: "" });
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        // Set body background to light red
        document.body.style.backgroundColor = " rgb(112 77 81)";

        // Cleanup: Reset background color on unmount
        return () => {
            document.body.style.backgroundColor = ""; // Reverts to default
        };
    }, []);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit("join", searchParams)

    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => {
            setState((_state) => [..._state, data]);
        });
    }, []);

    useEffect(() => {
        socket.on("room", ({ data: {users} }) => {
            setUsers(users.length);
        });
    }, []);

    const leftRoom = () => {
        socket.emit("leftRoom", { params });
        navigate("/");
    };
    const handleChange = ({target: {value}}) => setMessage(value);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message) return;

        socket.emit("sendMessage", { message, params });
        setMessage("");
    };
    const onEmojiClick = ({emoji}) => setMessage(`${message} ${emoji}`);

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {params.room}
                </div>
                <div className={styles.users}>
                    {users} users in this room
                </div>
                <button className={styles.left} onClick={leftRoom}>
                    Leave the room
                </button>
            </div>

            <div className={styles.messages}>
                <Messages messages={state} name={params.name}/>
            </div>    

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                <input 
                        type="text" 
                        name="message" 
                        placeholder="Say something cool"
                        id="" 
                        value={message}  
                        autoComplete="off"
                        onChange={handleChange} 
                        required
                    />
                </div>
                 {/* Emoji Picker and Submit Button */}
                <div className={styles.controls}>
                <button
                    type="button"
                    className={styles.emojiButton}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    😊
                </button>

                <div className={styles.button}>
                    <input type="submit" onSubmit={handleSubmit} value="Send a message"/>
               </div>
                </div>

                {isOpen && (
                <div className={styles.emojies}>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
                )}
            </form>
        </div>
    );
};

export default Chat;