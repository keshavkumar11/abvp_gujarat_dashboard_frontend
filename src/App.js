// src/App.js
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;