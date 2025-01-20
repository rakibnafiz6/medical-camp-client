import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const JoinCamp = ({ camps, id }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const campName = form.campName.value;
        const campFees = form.campFees.value;
        const location = form.location.value;
        const professionalName = form.professionalName.value;
        const participantName = form.participantName.value;
        const participantEmail = form.participantEmail.value;
        const age = form.age.value;
        const phoneNumber = form.phoneNumber.value;
        const gender = form.gender.value;
        const contact = form.contact.value;
        const paymentStatus = "unpaid";
        const confirmationStatus = "Pending";



        const JoinCamp = {
            campName, campFees, location, professionalName, participantName, participantEmail, age, phoneNumber, gender, contact, id, paymentStatus, confirmationStatus
        }
        
        axios.post(`${import.meta.env.VITE_API_URL}/joins`, JoinCamp)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Register data stored in db",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                    document.getElementById('my_modal_5').close();
                      navigate('/dashboard/register');
                }
            })
    }


    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>Join Camp</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleSubmit}>
                        {/* Camp Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Camp Name</label>
                            <input
                                type="text"
                                name='campName'
                                // defaultValue={camps.campName}
                                value={camps.campName}
                                readOnly
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter camp name"
                            />
                        </div>

                        {/* Camp Fees */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Camp Fees</label>
                            <input
                                type="number"
                                name='campFees'
                                // defaultValue={camps.fees}
                                value={camps.fees}
                                readOnly
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter camp fees"
                            />
                        </div>


                        {/* Location */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Location</label>
                            <input
                                type="text"
                                name='location'
                                // defaultValue={camps.location}
                                value={camps.location}
                                readOnly
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter location"
                            />
                        </div>



                        {/* Healthcare Professional Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Healthcare Professional</label>
                            <input
                                type="text"
                                name='professionalName'
                                // defaultValue={camps.professionalName}
                                value={camps.professionalName}
                                readOnly
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter healthcare professional name"
                            />
                        </div>

                        {/* Participant Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Participant Name</label>
                            <input
                                type="text"
                                name='participantName'
                                defaultValue={user?.displayName}
                                readOnly
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter participant name"
                            />
                        </div>

                        {/* Participant Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Participant Email</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                name='participantEmail'
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter participant email"
                            />
                        </div>
                        {/* Age */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Age</label>
                            <input
                                type="text"
                                name='age'
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter your age"
                                required
                            />
                        </div>
                        {/* Phone Number */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="number"
                                name='phoneNumber'
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div className="mb-4">
                            <select
                                name='gender'
                                required
                                className="w-full px-4 py-2 border rounded"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Emergency Contact */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Emergency Contact</label>
                            <input
                                type="text"
                                name='contact'
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Enter emergency contact"
                                required
                            />
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default JoinCamp;