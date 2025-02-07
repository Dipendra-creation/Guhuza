import '../styles/Home.css';
import { GrSend } from "react-icons/gr";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { PiFeatherDuotone } from "react-icons/pi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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
      <div className="w-full h-[149px] flex justify-center items-center flex-col gap-4">
  <div className="justify-start items-center inline-flex">
    <div className="text-center text-black text-4xl font-semibold font-['Roboto'] leading-normal">Innovate</div>
  </div>
  <div className="self-stretch h-[109px] flex-col justify-start items-center gap-6 flex">
    <div className="self-stretch text-center text-black text-6xl font-bold font-['Roboto'] leading-[57.60px]">Unlock Your Career Potential</div>
    <div className="self-stretch text-center text-black text-2xl font-normal font-['Roboto'] leading-[27px]">Engage, Learn, and Grow with Guhuza</div>
  </div>
</div>
      <div className="h-[423px] w-full justify-start items-start gap-8 inline-flex">
    <div className="w-[640px] self-stretch bg-[#0f4d83]/0 border border-[#0f4d83] justify-start items-start flex">
        <div className="grow shrink basis-0 self-stretch p-6 flex-col justify-center items-start gap-6 inline-flex">
            <div className="self-stretch h-[156px] flex-col justify-start items-start gap-3 flex">
                <div className="justify-start items-center inline-flex">
                    <div className="text-black font-semibold font-['Roboto'] leading-normal text-xl"><PiFeatherDuotone />Features</div>
                </div>
                <div className="self-stretch h-[124px] flex-col justify-start items-start gap-3 flex">
                    <div className="self-stretch text-black text-2xl font-bold font-['Roboto']">Explore Our Exciting Platform Features</div>
                    <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-4">Quizzes tailored for your career advancement.</div>
                </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
  <div className="flex justify-center items-center gap-2">
    <a href="https://example.com/learnmore" className="text-black text-base font-normal font-['Roboto'] leading-normal flex items-center">
      Learn More <MdOutlineKeyboardArrowRight className="ml-2" />
    </a>
  </div>
</div>
        </div>
        <div className="w-[344px] h-[421px] justify-center items-end inline-flex">
            <img className="self-stretch grow shrink basis-0" src="https://images.unsplash.com/photo-1612385763901-68857dd4c43c?q=80&w=3160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    </div>
    <div className="grow shrink basis-0 bg-[#0f4d83]/0 border border-black flex-col justify-start items-start inline-flex">
        <div className="self-stretch h-[252px] p-6 flex-col justify-center items-start gap-6 flex">
            <div className="self-stretch h-[156px] flex-col justify-start items-start gap-2 flex">
                <div className="justify-start items-center inline-flex">
                    <div className="text-black text-xl font-semibold font-['Roboto'] leading-normal"> <GrSend /> Share </div>
                </div>
                <div className="self-stretch h-[124px] flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch text-black text-2xl font-bold font-['Roboto'] leading-[33.60px]">Competitive Leaderboards</div>
                    <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">Compete and rise to the top with rewards.</div>
                </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
  <div className="flex justify-center items-center gap-2">
    <a href="https://example.com/join" className="text-black text-base font-normal font-['Roboto'] leading-normal flex items-center">
      Join <MdOutlineKeyboardArrowRight className="ml-2" />
    </a>
  </div>
</div>
        </div>
        <div className="self-stretch h-[171px] flex-col justify-end items-center flex">
            <img className="self-stretch h-[171px]" src="https://images.unsplash.com/flagged/photo-1578928534298-9747fc52ec97?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    </div>
    <div className="grow shrink basis-0 bg-[#0f4d83]/0 border border-black flex-col justify-start items-start inline-flex">
        <div className="self-stretch h-[252px] p-6 flex-col justify-center items-start gap-6 flex">
            <div className="self-stretch h-[156px] flex-col justify-start items-start gap-2 flex">
                <div className="justify-start items-center inline-flex">
                    <div className="text-black text-xl font-semibold font-['Roboto'] leading-normal"> <PiPlugsConnectedBold /> Connect</div>
                </div>
                <div className="self-stretch h-[124px] flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch text-black text-2xl font-bold font-['Roboto'] leading-[33.60px]">Engage with Community</div>
                    <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">Join a vibrant community of professionals today.</div>
                </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
  <div className="flex justify-center items-center gap-2">
    <a href="https://example.com/signup" className="text-black text-base font-normal font-['Roboto'] leading-normal flex items-center">
      Sign Up <MdOutlineKeyboardArrowRight className="ml-2" />
    </a>
  </div>
</div>
        </div>
        <div className=" h-[171px] w-full">
            <img className="w-full h-full" src="https://images.unsplash.com/photo-1591197172062-c718f82aba20?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    </div>
</div>
<div className="w-full h-[864px] px-16 py-28 bg-white flex-col justify-start items-start gap-20 inline-flex border border-black border-opacity-25">
  <div className="self-stretch justify-start items-center gap-20 inline-flex">
    <div className="grow shrink basis-0 flex-col justify-start items-start gap-[133px] inline-flex">
      <div className="self-stretch h-[281px] flex-col justify-start items-start gap-14 flex">
        <div className="self-stretch text-black text-[40px] font-bold font-['Roboto'] leading-[48px] bg-white p-4 bg-opacity-80">
          Unlock Your Career Potential with Guhuza&apos;s Innovative Networking Solutions
        </div>
        <div className="self-stretch text-black text-lg font-normal font-['Roboto'] leading-[27px] bg-white p-4 bg-opacity-80">
          Guhuza empowers professionals to enhance their careers through engaging digital interactions. Our platform combines networking with gamified experiences, making career development enjoyable and effective.
        </div>
      </div>
      <div className="self-stretch h-[130px] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch py-2 justify-start items-start gap-6 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-black text-5xl font-bold font-['Roboto'] leading-[57.60px]">Engagement</div>
            <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">Personalized AI quizzes for tailored career insights.</div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-black text-5xl font-bold font-['Roboto'] leading-[57.60px]">Community</div>
            <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">Connect with like-minded professionals and share achievements.</div>
          </div>
        </div>
      </div>
    </div>
    <img className=" h-[640px] border border-black border-opacity-30" src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  </div>
</div>
    </div>
  );
};

export default Home;