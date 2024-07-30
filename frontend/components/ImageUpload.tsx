import { useState } from "react";
import { API_URL } from "@/config";
import styles from "@/styles/Form.module.css";

interface ImageUploadProps {
  evtId: number;
  imageUploaded: (e: any) => void;
  token: string;
}

const ImageUpload = ({ evtId, imageUploaded, token }: ImageUploadProps) => {
  const [image, setImage] = useState<any>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "event");
    formData.append("refId", evtId.toString());
    formData.append("field", "image");
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded(image);
    }
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.file}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <button
            type="button"
            onClick={() => imageUploaded(image)}
            className="btn"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
