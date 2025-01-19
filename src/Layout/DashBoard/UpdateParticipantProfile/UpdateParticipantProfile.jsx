import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';

const UpdateParticipantProfile = () => {
    // const {user} = useAuth();
    const { id } = useParams();
    const { reset, setValue } = useForm();

    // const { data: user, refetch } = useQuery({
    //     queryKey: ['participant-profile-update', id],
    //     queryFn: async () => {
    //         const res = await axios.get(`${import.meta.env.VITE_API_URL}/participant/${id}`)
    //         return res.data;
    //     }
    // })

    // useEffect(() => {
    //     if (user) {
    //         refetch();
    //         setValue("name", user.name);
    //         setValue("image", user.image);
    //         setValue("email", user.email);
    //     }
    // }, [user, setValue]);



    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const email = form.email.value;
        const updateData = {
            name, image, email
        }
        // console.log(updateData);

        // axios.put(`${import.meta.env.VITE_API_URL}/update-participant/${id}`, updateData)
        // .then(res=>{
        //     console.log(res.data);
        // })


    }

    return (
        <div className='max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6'>
            <h2 className='text-2xl font-bold text-center mb-4'>Update Organizer Profile</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>
                        Image:
                        <input
                            type="url"
                            name="image"
                            // defaultValue={user?.image}
                            className='w-full px-4 py-2 border rounded'
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input
                            className='w-full px-4 py-2 border rounded'
                            type="text"
                            name="name"
                            // defaultValue={user?.name}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            className='w-full px-4 py-2 border rounded'
                            type="email"
                            name="email"
                            // defaultValue={user?.email}
                            required
                        />
                    </label>
                </div>
                <button className='btn btn-primary w-full mt-4' type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateParticipantProfile;