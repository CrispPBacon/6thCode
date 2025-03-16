import { useRef, useState } from "react";
import api from "../api/api";
import auth from "../context/AuthContext";

function Profile() {
  const [file, setFile] = useState<File | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = auth.useAuth();

  // const [profileImg, setProfileImg] = useState("");

  // useEffect(() => {
  //   if (!user) return;

  //   api
  //     .get(user.avatar, { responseType: "blob" })
  //     .then((res) => {
  //       const imageObjectURL = URL.createObjectURL(res.data);
  //       setProfileImg(imageObjectURL);
  //     })
  //     .catch((e) => console.log(e?.response?.data?.error || e));
  // }, [user]);

  const handleUploadClick = () => {
    if (profileInputRef.current) profileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
    console.log(file);
  };

  const handleSaveChanges = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    api
      .post("/api/profile/change-profile", formData, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e?.response?.data?.error || e));
  };

  return (
    <div className="flex flex--column align-center">
      <span className="profile-img">
        <img src={user?.avatar} alt="profile" />
      </span>
      <div className="form-container">
        <input
          ref={profileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="btn btn-normal"
          onClick={handleUploadClick}
        >
          {!file ? "Upload" : file.name}
        </button>
        <button type="button" className="btn btn-normal">
          Delete Profile
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
