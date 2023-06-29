import React from "react";
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <>
            <div className="bg-black min-h-screen flex justify-center items-center">
                <section className="flex justify-end items-center w-1/2 pr-10">
                    <div className="mb-10">
                        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
                        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
                    </div>
                    <div className="text-white text-right">
                        <h1 className="text-red-500 text-6xl font-bold mb-4">404</h1>
                        <h2 className="text-4xl mb-4">PAGE NOT FOUND</h2>
                        <h3 className="text-2xl mb-4">BACK TO HOME?</h3>
                        <Link to='/' className="text-lg font-bold mr-4 hover:text-red-500">YES</Link>
                        <Link to='*' className="text-lg font-bold hover:text-red-500">NO</Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default PageNotFound