import { appwriteService,setUser } from "../import.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

// building forms using yup + RHF.
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// toasts and notifications:
import { toast } from 'react-toastify';

// schema for the form and validation:
const schema = yup.object().shape({
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


function LoginForm(){
  const { register, handleSubmit,formState: { errors },isSubmitting} = useForm(
    {
      resolver: yupResolver(schema),
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // checks session and logins user
  const Submit = async (data) => {
   try{
      await appwriteService.Login(data);

      const user = await appwriteService.GetUser();
      if(user){
        dispatch(setUser(user));    
      }

      toast.success("Login successful!"); // Notify user of successful login
      // store -> login set to true.
      navigate("/dashboard");
   }catch(error){
    console.log("Error in LoginForm:", error);
    toast.error("Login failed: " + error.message); // Notify user of login failure
   }
  };

  return (
    <div className="flex h-screen">
      {/* Left: background image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV626dapoOfdh9DwzqOmITjUG9v-zBW9Zozw&s')" }}
      />

      {/* Right: form container */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit(Submit)}
          className="flex flex-col items-center bg-gray-200 p-8 rounded-lg shadow-lg w-4/5 max-w-md"

        >
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}

            // {...register("email", { required: true,
            //     minLength:{value:4,message:"Email must be at least 4 characters"},
            //     maxLength:{value:30,message:"Email must be at most 30 characters"},
            //  })} -> no need for this if using yup for validation.

            className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-[18px] font-bold p-3 rounded hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            Log In
          </button>
          {isSubmitting && <p className="text-red-500 text-sm">Logging in...</p>}
          <p className="mt-4"> Dont have an account ?<span> <Link to="/register" className="text-blue-700 font-bold"> Create </Link> </span></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
