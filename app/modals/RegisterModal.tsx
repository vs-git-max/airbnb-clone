"use client";

import { FcGoogle } from "react-icons/fc";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuthModal } from "../store/useAuthModalStore";
import Modal from "./Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const RegisterModal = () => {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const { isRegisterOpen, closeRegister, openLogin } = useAuthModal();

  const [values, setValues] = useState<RegisterValues>(initialValues);

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }

  function validate() {
    const newErrors: RegisterErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name field required";
    } else if (values.name.length < 3) {
      newErrors.name = "Name must be at least three characters long";
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!values.email.trim()) {
      newErrors.email = "Email field is needed";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Add the correct email format";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!values.password.trim()) {
      newErrors.password = "Password field required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Password should have at least an uppercase, lowercase,number ans special symbols";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
      });

      if (error) {
        toast(error.message as string, {
          style: {
            background: "#ff5a5f",
            color: "white",
          },
        });
        return;
      }

      toast("Registration successful", {
        style: {
          background: "#14532d",
          color: "white",
        },
      });
      setValues(initialValues);
      closeRegister();
      router.refresh();
    } catch (error) {
      toast(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again!",
        {
          style: {
            background: "#ff5a5f",
            color: "white",
          },
        },
      );
    } finally {
      setLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast("Google signin failed", {
        style: {
          background: "#14532d",
          color: "white",
        },
      });
    }
  };

  return (
    <Modal title="Register" isOpen={isRegisterOpen} onClose={closeRegister}>
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome to Airbnb
        </h2>
        <p className="text-sm text-gray-500 ">Create an account</p>
      </div>
      <form onSubmit={onSubmit} className="md:space-y-6  space-y-2">
        <Input
          name="name"
          label="Name"
          type="text"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Button
          onClick={signInWithGoogle}
          disabled={loading}
          loading={loading}
          type="submit"
        >
          Continue
        </Button>
        <div className="relative my-6 ">
          <div className="absolute inset-0 flex items-center ">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-500">or</span>
          </div>
        </div>
        <Button
          disabled={loading}
          loading={loading}
          icon={<FcGoogle size={22} />}
          variant="outline"
          type="button"
        >
          Continue with Google
        </Button>
        {/* footer */}
        <p className="text-gray-500 text-center text-sm mt-6 ">
          Already have an account?{" "}
          <span
            onClick={() => openLogin()}
            className="text-primary cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default RegisterModal;
