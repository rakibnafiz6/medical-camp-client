import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddCamp = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const formatDateTimeWithDateFns = (dateTimeString) => {
        return format(new Date(dateTimeString), "Pp");
    };

    const onSubmit = (data) => {
        // console.log(data.participantCount);
        const participant = parseInt(data.participantCount)
        // console.log(participant);
        const formattedDateTime = formatDateTimeWithDateFns(data.dateTime);
        const updatedData = { ...data, dateTime: formattedDateTime, participantCount: participant };

        axiosSecure.post('/camps', updatedData)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Camps data stored in db",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      reset();
                      navigate('/dashboard/manage-camps');
                }    
            })
    };
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl font-bold mb-4">Add A Camp</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Camp Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Camp Name</label>
                    <input
                        type="text"
                        {...register("campName", { required: "Camp Name is required" })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter camp name"
                    />
                    {errors.campName && (
                        <p className="text-red-500 text-sm">{errors.campName.message}</p>
                    )}
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        {...register("image", { required: "Image URL is required" })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter image URL"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}
                </div>

                <div className='flex gap-2 flex-col md:flex-row'>

                    {/* Camp Fees */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Camp Fees</label>
                        <input
                            type="number"
                            {...register("fees", {
                                required: "Camp Fees are required",
                                min: { value: 0, message: "Fees cannot be negative" },
                            })}
                            className="w-[300px] px-4 py-2 border rounded"
                            placeholder="Enter camp fees"
                        />
                        {errors.fees && (
                            <p className="text-red-500 text-sm">{errors.fees.message}</p>
                        )}
                    </div>

                    {/* Date & Time */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Date & Time</label>
                        <input
                            type="datetime-local"
                            {...register("dateTime", { required: "Date & Time is required" })}
                            className="w-[300px] px-4 py-2 border rounded"
                        />
                        {errors.dateTime && (
                            <p className="text-red-500 text-sm">{errors.dateTime.message}</p>
                        )}
                    </div>
                </div>

                <div className='flex gap-2 flex-col md:flex-row'>
                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            {...register("location", { required: "Location is required" })}
                            className="w-[300px] px-4 py-2 border rounded"
                            placeholder="Enter location"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Participant Count */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Participant Count</label>
                        <input
                            className="w-[300px] px-4 py-2 border rounded"
                            type="number"
                            value={0}
                            {...register("participantCount")}
                        />
                    </div>
                </div>

                {/* Healthcare Professional Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Healthcare Professional</label>
                    <input
                        type="text"
                        {...register("professionalName", {
                            required: "Healthcare Professional Name is required",
                        })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter healthcare professional name"
                    />
                    {errors.professionalName && (
                        <p className="text-red-500 text-sm">
                            {errors.professionalName.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter camp description"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Camp
                </button>
            </form>
        </div>
    );
};

export default AddCamp;