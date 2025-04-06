"use client"

export default function AccountPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>

      {/* Personal Information Section Skeleton */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-muted-foreground">Name: </span>
              <div className="h-4 bg-gray-200 rounded w-32 ml-2 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-muted-foreground">Email: </span>
              <div className="h-4 bg-gray-200 rounded w-48 ml-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking List Section Skeleton */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">My Bookings</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Generate 4 skeleton booking cards */}
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="relative bg-gray-100 p-4 rounded-lg shadow animate-pulse">
                {/* Booking details skeleton */}
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

                {/* Button container skeleton */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}

