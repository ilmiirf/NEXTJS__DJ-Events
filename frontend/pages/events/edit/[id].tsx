import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import Modal from "@/components/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "@/styles/Form.module.css";
import { EventData } from "@/types/event";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";
import { parseCookies } from "@/helpers";

interface EditEventProps {
  evt: EventData;
  token: string;
}

const EditEvent = ({ evt, token }: EditEventProps) => {
  const [values, setValues] = useState({
    name: evt.attributes.name,
    performers: evt.attributes.performers,
    venue: evt.attributes.venue,
    address: evt.attributes.address,
    date: evt.attributes.date,
    time: evt.attributes.time,
    description: evt.attributes.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.attributes.img ? evt.attributes.img : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(values);

    //Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const response = fetch(`${API_URL}/api/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: values,
      }),
    });

    if (!(await response).ok) {
      if ((await response).status === 403 || (await response).status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Something went wrong");
    } else {
      const data = await (await response).json();
      router.push(`/events/${data.data.id}`);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e: any) => {
    const res = await fetch(`${API_URL}/api/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.data.attributes.img);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt={""} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          className="btn-secondary btn-icon"
          onClick={() => setShowModal(true)}
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal
        title="Image Upload"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export const getServerSideProps = async ({ params: { id }, req }: any) => {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/${id}`);
  const { data } = await res.json();

  console.log(req.headers.cookie);

  return {
    props: {
      evt: data,

      token,
    },
  };
};

export default EditEvent;
