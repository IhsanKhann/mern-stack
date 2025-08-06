import { appwriteService } from '../import.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function RegisterForm(){
  const { register, handleSubmit, formState: { errors },isSubmitting } = useForm();


  const navigate = useNavigate();

  const Submit = async (data) => {
    await appwriteService.Register(data);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit(Submit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true,maxLength: 10 })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true,
                minLength: {value:4,message:"Email must be at least 4 characters"},
                maxLength: 30 })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength:{value:8,message:"Password must be at least 8 characters"}, maxLength: {value:30, message:"the max charachter length exceeded."} })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-[18px] font-bold py-2 rounded hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
