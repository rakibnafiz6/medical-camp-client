import { useLocation } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";



const Feedback = () => {
    const [rating, setRating] = useState(0);
    // console.log(rating);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const campName = queryParams.get("campName");
    const participantName = queryParams.get("name");

    // console.log(campName, participantName);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;

        const feedbackData = {
            feedback, rating, campName, participantName
        }

        axios.post(`${import.meta.env.VITE_API_URL}/feedbacks`, feedbackData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully your feedback",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    form.reset();
                }
            })
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Feedback and Rating</h2>
            <form onSubmit={handleSubmit}>
                {/* Rating */}
                <div className="mb-4">
                    <label className="block text-gray-700">Rating</label>
                    <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                </div>
                {/* Participant Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Participant Name</label>
                    <textarea name="feedback" className="w-full px-4 py-2 border rounded" placeholder="Enter your feedback">
                    </textarea>
                </div>

                {/* submit btn */}
                <button type="submit" className="btn btn-primary">Send Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;