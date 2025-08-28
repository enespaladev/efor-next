"use client";
import React from 'react'
import Container from '../Container/container';

function Map() {
    const map_url = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25216.460730626284!2d29.094698999999995!3d37.81212!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c71582462be17b%3A0x579fcc678e52eb72!2sEfor%20Nuts%20Roasting%20Machines%20-%20Kuruyemi%C5%9F%20Kavurma%20Makinalar%C4%B1!5e0!3m2!1str!2str!4v1753944108427!5m2!1str!2str";

    return (
        <Container>
            <div className="max-w-7xl mx-auto p-6 sm:p-0">
                <iframe
                    src={map_url}
                    width="100%"
                    height="500"
                    style={{ border: 0, height: "500px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className='border-2 rounded-3xl shadow-xl'
                ></iframe>
            </div>
        </Container>
    )
}

export default Map
