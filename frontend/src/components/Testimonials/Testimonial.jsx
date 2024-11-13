import React from 'react';
import './Testimonial.css'

const Testimonials = () => {
    // Testimonial data array
    const testimonialData = [
        {
            id: 1,
            comment: "The dining experience here is unforgettable! The flavors are exquisite, and every dish is prepared with such care. I can't wait to come back!",
            image: "https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg",
            name: "Sarah Miller",
            role: "Frequent Diner"
        },
        {
            id: 2,
            comment: "Exceptional service and delicious food! The ambiance is perfect, and the staff are always attentive and friendly. A must-visit spot!",
            image: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
            name: "Asmath Hiraly",
            role: "Satisfied Customer"
        },
        {
            id: 3,
            comment: "The dishes are not only beautifully presented but taste amazing. I love the variety on the menu and appreciate the use of fresh ingredients. Highly recommend!",
            image: "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
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