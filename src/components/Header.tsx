import {useNavigate} from "react-router";
import React from "react";


interface HeaderProps {
    children: React.ReactNode,
    style: object,
    displayBackButton: boolean,
}
export function Header({children, style, displayBackButton}:HeaderProps) {
    const navigate = useNavigate();
    return (
        <header className={'d-flex justify-content-between align-items-baseline'} style={style}>
            {displayBackButton &&
                <i className="bi bi-arrow-left-square" role={"button"} onClick={() => navigate(-1)}></i>}
            <h1 className={'m-1'}>Заметки</h1>
            <section className="d-flex">
                {children}
            </section>
        </header>
    )
}