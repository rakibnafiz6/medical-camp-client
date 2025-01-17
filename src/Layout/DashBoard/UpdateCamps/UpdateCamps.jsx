import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCamps = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: camp, isLoading } = useQuery({
        queryKey: ['camps-update', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/update-camps/${id}`)
            return res.data;
        }
    })

    console.log(camp);

    const {
        register, formState: { errors }, reset,
        setValue } = useForm();

    useEffect(() => {
        if (camp) {
            setValue("campName", camp.campName);
            setValue("image", camp.image);
            setValue("fees", camp.fees);
            setValue("location", camp.location);
            setValue("dateTime", camp.dateTime);
            setValue("participantCount", camp.participantCount);
            setValue("professionalName", camp.professionalName);
            setValue("description", camp.description);

        }
    }, [camp, setValue]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const campName = form.campName.value;
        const image = form.image.value;
        const fees = form.fees.value;
        const dateTime = format(new Date(form.dateTime.value), "Pp");
        const location = form.location.value;
        const participantCount = parseInt(form.participantCount.value);
        const professionalName = form.professionalName.value;
        const description = form.description.value;

        const updatedCamp = {
            campName, image, fees, dateTime, location, participantCount, professionalName, description
        }

        axios.put(`${import.meta.env.VITE_API_URL}/camps-update/${id}`, updatedCamp)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Camps data update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                      navigate('/dashboard/manage-camps');
                }
            })
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Camp</h2>
            <form onSubmit={handleSubmit}>
                {/* Camp Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Camp Name</label>
                    <input
                        type="text"
                        name="campName"
                        defaultValue={camp?.campName}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter camp name"
                        required
                    />
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        defaultValue={camp?.image}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div className='flex gap-2'>

                    {/* Camp Fees */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Camp Fees</label>
                        <input
                            type="number"
                            name="fees"
                            defaultValue={camp?.fees}
                            {...register("fees", {
                                min: { value: 0, message: "Fees cannot be negative" },
                            })}
                            className="w-[300px] px-4 py-2 border rounded"
                            placeholder="Enter camp fees"
                            required
                        />
                        {errors.fees && (
                            <p className="text-red-500 text-sm">{errors.fees.message}</p>
                        )}
                    </div>

                    {/* Date & Time */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Date & Time</label>
                        <input
                            defaultValue={camp?.dateTime}
                            type="datetime-local"
                            name="dateTime"
                            required
                            className="w-[300px] px-4 py-2 border rounded"
                        />
                    </div>
                </div>

                <div className='flex gap-2'>
                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={camp?.location}
                            className="w-[300px] px-4 py-2 border rounded"
                            placeholder="Enter location"
                            required
                        />
                    </div>

                    {/* Participant Count */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Participant Count</label>
                        <input
                            className="w-[300px] px-4 py-2 border rounded"
                            type="number"
                            name="participantCount"
                            defaultValue={camp?.participantCount}
                            required
                        />
                    </div>
                </div>

                {/* Healthcare Professional Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Healthcare Professional</label>
                    <input
                        type="text"
                        name="professionalName"
                        defaultValue={camp?.professionalName}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter healthcare professional name"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        defaultValue={camp?.description}
                        name="description"
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter camp description"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Update Camp
                </button>
            </form>
        </div>
    );
};

export default UpdateCamps;