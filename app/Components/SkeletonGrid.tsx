export const SkeletonGrid = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-80 h-96 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
};
