import PageLoaderIcon from "@/public/page-loader-icon";

const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-background">
      <PageLoaderIcon className="w-20 h-20" />
    </div>
  );
};

export default PageLoader;
