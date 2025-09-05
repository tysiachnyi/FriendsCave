interface HomeProps {
  onNavigate: (screen: "join" | "create") => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  return (
    <>
      <h2 className="text-4xl font-bold mb-4">Welcome to FriendsCave</h2>
      <p className="text-lg text-gray-700 text-center max-w-xl">
        Your personal space to create private “caves” and hang out with your
        friends.
      </p>
      <div className="flex flex-col sm:flex-row justify-center mt-10 gap-8">
        <button
          onClick={() => onNavigate("join")}
          className="bg-white hover:shadow-lg transition-shadow rounded-xl shadow-md cursor-pointer p-8 flex flex-col items-center w-72 border border-gray-100"
        >
          <h3 className="text-2xl font-semibold mb-2">Join</h3>
          <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">
            Have a code already? Jump straight into a cave that a friend
            created.
          </p>
        </button>
        <button
          onClick={() => onNavigate("create")}
          className="bg-white hover:shadow-lg transition-shadow rounded-xl shadow-md cursor-pointer p-8 flex flex-col items-center w-72 border border-gray-100"
        >
          <h3 className="text-2xl font-semibold mb-2">Create</h3>
          <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">
            Spin up a brand-new cave and invite friends with a unique access
            code.
          </p>
        </button>
      </div>
    </>
  );
};
