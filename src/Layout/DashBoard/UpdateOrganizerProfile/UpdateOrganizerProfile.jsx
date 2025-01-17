
const UpdateOrganizerProfile = () => {
    const handleUpdate = (e)=>{
        e.preventDefault();
    }
    return (
        <div className='max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6'>
        <h2 className='text-2xl font-bold text-center mb-4'>Update Organizer Profile</h2>
        <form onSubmit={handleUpdate}>
        <div>
        <label>
            Image:
            <input
              type="text"
              name="image"
              className='w-full px-4 py-2 border rounded'
            //   value={profile.image}
            //   onChange={handleInputChange}
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
            //   value={profile.name}
            //   onChange={handleInputChange}
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
            //   value={profile.email}
            //   onChange={handleInputChange}
            />
          </label>
         </div>
          {/* <div>
          <label>
            Phone:
            <input
            className='w-full px-4 py-2 border rounded'
              type="text"
              name="phone"
            //   value={profile.phone}
            //   onChange={handleInputChange}
            />
          </label>
          </div> */}
          <button className='btn btn-primary w-full mt-4' type="submit">Update</button>
        </form>
      </div>
    );
};

export default UpdateOrganizerProfile;