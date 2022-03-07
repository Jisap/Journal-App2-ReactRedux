import React from 'react'
import dayjs from "dayjs";
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const advancedFormat = require("dayjs/plugin/advancedFormat"); // // advancedFormat permite usar la fecha ordinal entre otras opciones
dayjs.extend(advancedFormat);

export const JournalEntry = ({ id, date, title, body, url }) => {

    const day = dayjs(date);

    const dispatch = useDispatch()
    
    const handleEntryClick = () => {
        dispatch (activeNote(id, { date, title, body, url })) // Cuando se clickea una nota del sidebar se pone como activa
    }

    return (
        <div 
            className="journal__entry animate__animated animate__fadeIn"
            onClick= { handleEntryClick }>
            { 
                url &&                                    // Si existe el url se mostrará      
                <div 
                    className="journal__entry-picture"
                    style={{ 
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }} 
                />
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ day.format("dddd")}</span>
                <h4>{ day.format("Do")}</h4>
            </div>

        </div>
    )
}
