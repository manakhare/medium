import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(JSON.parse(localStorage.getItem("user") || "Anonymous")?.name || "Anonymous");
  // const [email, setEmail] = useState<string>(JSON.parse(localStorage.getItem("user") || "Anonymous")?.name || "Anonymous")
  const [description, setDescription] = useState<string>('');

  const handleCancel = () => {
    navigate('/blogs')
  }


  const handleSave = async () => {
    // const updateProfileDetails = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/profile`, {
        name: username,
        description: description
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      const profileData = res.data;
      setUsername(profileData.name);
      // setEmail(profileData.email);
      setDescription(profileData.description);

      toast.success('Profile updated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })

      navigate("/blogs")

    } catch (error) {
      toast.error("Can't update!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
    // }  
    // updateProfileDetails();
  }


  useEffect(() => {

    const fetchProfileDetails = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        // console.log(res.data);
        
        const profileData = res.data.profile;
        // console.log(profileData);

        setUsername(profileData.name);
        // setEmail(profileData.email);
        setDescription(profileData.description);
      } catch (error) {
        // console.log(error);
        toast.error("Unable to fetch profile details!")
      }
    }
    fetchProfileDetails();

    return () => { }
  }, [])

  return (
    <div className="h-full w-full relative">
      <Appbar />

      <div className="mt-5 p-5 h-screen w-full flex flex-col justify-start items-center">
        <div className="font-serif font-bold text-3xl">Profile</div>
        <div className="w-[60%] md:w-[40%] my-5 flex flex-col gap-5 px-5 justify-start items-center py-10 px-4 bg-slate-50 border rounded-md shadow-md cla">
          <div className="w-full flex flex-col items-start lg:flex-row justify-start lg:items-center gap-2 lg:gap-5 px-2">
            <div className="text-gray-800 font-semibold">Username:</div>
            <input
              value={username}
              maxLength={50}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 w-full border-gray-400 text-gray-800 rounded-md px-2 py-1" />
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-start lg:gap-5 gap-2 px-2">
            <div className="text-gray-800 font-semibold">Description:</div>
            <div className="w-full">
              <textarea
                value={description === '' ? '' : description}
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 border-gray-400 w-full text-gray-800 rounded-md h-40 px-2 py-1" />
              <div className="font-light text-sm flex justify-end ">{200 - description.length} characters left</div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-end px-2 gap-5">
            <button
              className="bg-green-500 px-10 py-2 text-white font-semibold hover:bg-green-600 border border-green-600"
              onClick={handleSave}>Save</button>
            <button
              className="bg-slate-200 px-10 py-2 text-gray-800 font-semibold hover:text-gray-700 hover:bg-slate-100 border border-gray-400"
              onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile