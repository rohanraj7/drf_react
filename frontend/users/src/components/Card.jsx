import React from 'react'

function Card({children,noPadding}){
    let classes="bg-white shadow-md shadow-gray-300 rounded-md mb-5 "
    if(!noPadding){
        classes += ' p-4';
    }
    return(
        <div className={classes}>
            {children}
        </div>
    )
}

export default Card 


// margin-left: -376px;
// margin-right: 334px;
// padding-left: 22px;