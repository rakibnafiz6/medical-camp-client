import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
    const { createUser, updateUserProfile, user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
       
        createUser(data.email, data.password)
            .then(result => {
                // console.log(result);
               
                const profile = {
                    displayName: data.name,
                    photoURL: data.photo,
                }
                updateUserProfile(profile)
                    .then(() => {
                        // console.log('update profile successfully');
                      
                    // user stored db
                    axios.post(`${import.meta.env.VITE_API_URL}/users`, {
                        name: data.name,
                        email: data.email,
                        image: data.photo,
                    })
                        .then(res => {
                            // console.log(res.data);
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "User Created successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                                reset();
                            }
                        })
                    })



            })
            .catch(error => {
                console.log(error.message);
            })
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                    Your gateway to accessible healthcare and wellness. Register to explore upcoming medical camps, register for health services, and stay informed about important healthcare events.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo-Url</span>
                            </label>
                            <input
                                {...register('photo', { required: "Photo is required" })}
                                type="url" placeholder="photo-url" className="input input-bordered" />
                            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...register('name', { required: "Name is required" })}
                                type="text" placeholder="name" className="input input-bordered" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register('email', { required: "Email is required" })}
                                type="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register('password', {
                                    required: "Password is required", pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                        message:
                                            "Password must contain at least one uppercase and one lowercase letter",
                                    }, minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                                type="password" placeholder="password" className="input input-bordered" />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                    <p className="text-center py-3">Already Have an account Please!<Link to='/login' className="text-red-600">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;