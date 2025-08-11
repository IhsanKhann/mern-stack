import { appwriteService,setUser } from '../import.js';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {showSuccess} from '../toastUtility/toast'; 

// using yup for validation, rhf for form handling.
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// make schema for the form.
const schema = yup.object().shape({
  name: yup
  .string()
  .required("Name is required"),

    email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  
    password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(30, "Password must be at most 30 characters")
    .required("Password is required"), 
});

function RegisterForm(){
  const { register, handleSubmit, formState: { errors },isSubmitting } = useForm({
    resolver: yupResolver(schema), // ✅ Correct key is "resolver", not "resolve"
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // this is to register the user and check session
      const Submit = async (data) => {
        try{
          await appwriteService.Register(data);
      
          const user = await appwriteService.GetUser();
          if(user){
            dispatch(setUser(user));    
          }
          showSuccess("Registration successful!");
          navigate("/dashboard");
        }
        catch(error){
          console.log("Error in RegisterForm:", error);
          throw error;
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit(Submit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
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
