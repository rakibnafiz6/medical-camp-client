import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import '@smastrom/react-rating/style.css'

const ShowFeedback = () => {

    const { data: feedbacks = [] } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/feedback-rating`);
            return res.data;
        }
    })

    console.log(feedbacks);
    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Feedback and Ratings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {feedbacks.map(feedback =><div key={feedback._id} className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{feedback.campName}</h2>
                        <p>{feedback.participantName}</p>
                        <p>
                        <Rating style={{ maxWidth: 250 }} value={feedback.rating} readOnly />
                        </p>
                        <p>{feedback.feedback}</p>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default ShowFeedback;