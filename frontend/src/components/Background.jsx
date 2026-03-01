import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute top-10 left-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-60 animate-pulse" />

      {/* Rotating Borders */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute top-20 left-1/3 h-60 w-60 border-2 border-purple-500/30 rounded-2xl"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute top-20 left-1/3 h-72 w-72 border border-blue-500/30 rounded-3xl"
      />
    </div>
  );
};

export default Background;
