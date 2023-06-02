import { Link } from 'react-router-dom';
import './index.css';

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img src="https://i.ibb.co/vqbqwjk/wardrobify.png"></img>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Need to keep track of your shoes and hats? We have
          the solution for you!
        </p>
      </div>
    </div>
  );
}

export default MainPage;


