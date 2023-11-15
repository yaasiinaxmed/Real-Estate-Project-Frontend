import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, NativeSelect, PasswordInput, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function LoginContent() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      password: (value) => !value.trim() && "Invalid Password",
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      console.log(form.values);
    }
  };
  return (
    <div className="w-full md:w-2/4 xl:w-1/3 p-6 sm:p-8 rounded-lg flex flex-col shadow-[0px_0px_6px_rgb(0,0,0,0.1)]">
      <h2 className="text-3xl font-medium text-center">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          mt="md"
          size="md"
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          {...form.getInputProps("password")}
        />
        <button className="mt-6 w-full bg-primaryColor bg-opacity-90 hover:bg-opacity-100 px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 ">
          Login
        </button>
      </form>
      <Text ta="center" mt="md">
        Don't have an account?{" "}
        <Link to="/Signup" className="text-primaryColor">
          Sign Up
        </Link>
      </Text>
    </div>
  );
}

export default LoginContent;
