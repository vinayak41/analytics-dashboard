import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Assuming you're using lucide icons
import { Input, InputProps } from "./input";

const PasswordInput = ({ ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        name="password"
        className="w-full p-2 border border-gray-300 rounded-md pr-10" // Added extra padding on the right for the icon
        {...props}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
