import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-md">
          <div className="h-11 bg-gray-200 rounded-lg shimmer"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg shimmer"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg shimmer flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="h-5 bg-gray-200 rounded shimmer mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded shimmer w-1/2"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;