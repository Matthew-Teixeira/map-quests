import map from '../assets/images/map_2.jpg'

const Home = () => {
  const route_to = () => {
    window.location.assign("/login")
  }
  return (
    <div style={{
      backgroundImage: `url(${map})`,
      height: 'auto',
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Hero Section */}
      <section
        className="flex flex-col md:flex-row justify-center items-center py-10"
        style={{ height: 'calc(100vh - 66px)' }}
      >
        <div className="text-left max-w-lg p-6 text-slate-200">
          <h2 className="text-4xl font-extrabold mb-4">Plot Your Own Course</h2>
          <p className="text-xl font-extrabold mb-4">Whether hiking, boating, exploring, or within professional endeavors, create your own custom maps with curated coordinates and routes that suit your needs.</p>
          <button className="bg-green-500 hover:bg-green-600 dark:bg-slate-800 text-white px-6 py-2 rounded-md dark:hover:bg-slate-700"
          onClick={route_to}>
            Get Started
          </button>
        </div>
        {/* <img
          className="rounded-md object-cover"
          src="https://plus.unsplash.com/premium_photo-1661311943117-c515634ea81d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFwfGVufDB8fDB8fHww"
          alt="Map example"
        /> */}
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 bg-opacity-90 p-2">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Custom Maps</h4>
              <p>Create your own map plots utilizing your phone's GPS.</p>
            </div>
            <div className="p-6 bg-slate-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Upload</h4>
              <p>Populate new or old maps with excel and csv data.</p>
            </div>
            <div className="p-6 bg-slate-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Share & Collaborate</h4>
              <p>Share your maps with others and collaborate in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Map Your World. All rights reserved.</p>
          <div className="space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;