'use client';


const SKELETON_ITEMS_COUNT = 12;

function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(SKELETON_ITEMS_COUNT)].map((_, i) => (
              <div key={i} className="bg-gray-700 border-2 border-gray-600 p-4">
                <div className="bg-gray-600 h-32 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonDashboard;
