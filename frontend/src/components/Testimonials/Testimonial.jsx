import React from 'react';
import './Testimonial.css'

const Testimonials = () => {
    // Testimonial data array
    const testimonialData = [
        {
            id: 1,
            comment: "The dining experience here is unforgettable! The flavors are exquisite, and every dish is prepared with such care. I can't wait to come back!",
            image: "/images/testi2.png",
            name: "Sarah Miller",
            role: "Frequent Diner"
        },
        {
            id: 2,
            comment: "Exceptional service and delicious food! The ambiance is perfect, and the staff are always attentive and friendly. A must-visit spot!",
            image: "/images/testi.jpeg",
            name: "Michael Chen",
            role: "Satisfied Customer"
        },
        {
            id: 3,
            comment: "The dishes are not only beautifully presented but taste amazing. I love the variety on the menu and appreciate the use of fresh ingredients. Highly recommend!",
            image: "/images/testi3.jpg",
            name: "Emma Thompson",
            role: "Loyal Patron"
        }
    ];

    return (
        <div className="testimonial-main">
            <div className="container">
                <p>CUSTOMER REVIEWS</p>
                <h2>What our delighted diners say about us</h2>
                <div className="testimonials">
                    {testimonialData.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial">
                            <div className="star">★ ★ ★ ★ ★</div>
                            <p>{testimonial.comment}</p>
                            <img src={testimonial.image} alt={testimonial.name} />
                            <p className="name">{testimonial.name}</p>
                            <p className="role">{testimonial.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;