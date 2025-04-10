import React from 'react'

import './LinkCard.css';

const LinkCard = (props) => {
    return (
        <div className="linkcard">
            <div className="linkcard-header">
                <div className="linkcard-title">{props.title}</div>
                <div className="linkcard-details">
                    <span>{props.year}</span>
                    <span>/</span>
                    <span>{props.category}</span>
                    {props.client && (
                        <>
                            <span>/</span>
                            <span>
                                For{' '}
                                {props.clientUrl ? (
                                    <a href={props.clientUrl}>{props.client}</a>
                                ) : (
                                    props.client
                                )}
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="linkcard-description">{props.description}</div>
            <a className="linkcard-anchor" href={props.url}>
                View live
            </a>
        </div>
    )
}
  
export default LinkCard