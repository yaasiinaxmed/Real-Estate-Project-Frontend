import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Avatar } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HiCamera } from "react-icons/hi2";
import toast from "react-hot-toast";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../store/api/UserSlice";

function EditProfileContent() {
  const { data: user = [] } = useGetUserQuery();
  const [editUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcbeluo20",
        uploadPreset: "mfdrpo5g",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setAvatarUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },

    validate: {
      name: (value) => !value.trim() && "Invalid name",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  useEffect(() => {
    form.setFieldValue("avatar", avatarUrl);
  }, [avatarUrl, form]);

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      try {
        const result = await editUser(form.values).unwrap();
        toast.success(result.message);
        navigate("/");
      } catch (error) {
        if (error && error.data) {
          toast.error(error.data.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  };

  return (
    <div className="w-full md:w-2/4 xl:w-1/3 p-6 sm:p-8 rounded-lg flex flex-col shadow-[0px_0px_6px_rgb(0,0,0,0.1)]">
      <h2 className="text-3xl font-medium text-center">Edit Profile</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex items-center justify-center mt-3">
          <div
            onClick={() => widgetRef.current?.open()}
            className="group w-[120px] relative text-cursor-pointer"
          >
            {/* image avatar */}
            <Avatar src={avatarUrl} size={120} radius={120} mx="auto" />
            {/* hover upload image */}
            <div className="duration-300 group-hover:flex hidden cursor-pointer bg-black bg-opacity-30 absolute top-0 left-0 w-full h-full rounded-full items-center justify-center text-3xl text-white">
              <HiCamera />
            </div>
          </div>
        </div>

        <TextInput
          withAsterisk
          label="Name"
          mt="md"
          size="md"
          placeholder="Enter your name"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          mt="md"
          size="md"
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />
        <button className="mt-6 w-full bg-primaryColor bg-opacity-90 hover:bg-opacity-100 px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 ">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProfileContent;
