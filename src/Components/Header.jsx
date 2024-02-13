export default function Header(){
    return (
        <header className="bg-blue-900 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold"> MJ Fantasy Premier League Stats</div>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-gray-300">Home</a></li>
                <li><a href="#" className="hover:text-gray-300">About</a></li>
                <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                <li><a href="#" className="hover:text-gray-300">Sign In</a></li>
              </ul>
            </nav>
          </div>
        </header>
      );
}