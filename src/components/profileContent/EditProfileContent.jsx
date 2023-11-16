import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Avatar,
  FileInput,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
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
  const [fileName, setFileName] = useState("");
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
          setFileName(result.info.original_filename);
        }
      }
    );
  }, [cloudinaryRef, widgetRef]);

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
        <Avatar
          src={avatarUrl}
          size={120}
          radius={120}
          mx="auto"
          className="my-3"
        />
        <FileInput
          control={form}
          withAsterisk
          defa
          label="Avatar"
          placeholder="Choose new avatar or image"
          accept="image/*"
          onClick={() => widgetRef.current?.open()}
          {...form.getInputProps("avatar")}
        />

        <TextInput
          withAsterisk
          label="Name"
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
