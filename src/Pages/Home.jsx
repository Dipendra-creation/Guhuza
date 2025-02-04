
import '../styles/Home.css';

const handleClick = () => {
  window.location.href = 'https://guhuza.com/job-seeker/register';
};

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-heading-container">
          <div className="home-heading">
            Transform Your Networking Experience with Guhuza
          </div>
        </div>
        <div className="home-text-container">
          <div className="home-description">
            At Guhuza, we revolutionize professional networking through engaging digital
            solutions. Join our vibrant community and elevate your career with interactive tools
            designed for success.
          </div>
          <div className="home-button-container">
            <div className="home-button">
              <div className="home-button-text" onClick={handleClick}>
                Join now
              </div>
            </div>
            <div className="home-button">
              <div className="home-button-text">Learn More</div>
            </div>
          </div>
        </div>
      </div>
      <video className="home-video" controls>
        <source src="https://guhuza.com/video/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Home;