import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // adjust path based on your setup
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router";


const SignUpCallToAction = () => {
const navigate = useNavigate();

  return (
    <motion.div
      className="text-center py-12 px-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white rounded-2xl shadow-xl mt-10 mx-auto max-w-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
    >
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="w-6 h-6 animate-pulse mr-2" />
        <h2 className="text-2xl font-bold">
          Don’t Miss Out — Join Us Today!
        </h2>
      </div>
      <p className="mb-6 text-sm md:text-base">
        Start your journey with us and unlock exclusive deals, premium listings, and tailored experiences. Sign up now and elevate your travel.
      </p>
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Button
          className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-colors"
          onClick={() => navigate("/sign-up")} // or use navigation method of your router
        >
          Sign Up Now
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SignUpCallToAction;
