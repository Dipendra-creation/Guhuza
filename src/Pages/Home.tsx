import React from 'react';
import '../styles/Home.css';
import { GrSend } from "react-icons/gr";
import { PiPlugsConnectedBold, PiFeatherDuotone } from "react-icons/pi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import logo_b from '../assets/logo_b.png';

// Function to handle button click
const handleClick = (): void => {
  window.location.href = 'https://guhuza.com/job-seeker/register';
};

const Home: React.FC = () => {
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

      <video className="home-video" controls autoPlay muted loop>
  <source src="https://guhuza.com/video/intro.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <div className="w-full h-[149px] flex justify-center items-center flex-col gap-4">
        <div className="justify-start items-center inline-flex">
          <div className="text-center text-black text-4xl font-semibold font-['Roboto'] leading-normal">Innovate</div>
        </div>
        <div className="self-stretch h-[109px] flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch text-center text-black text-6xl font-bold font-['Roboto'] leading-[57.60px]">
            Unlock Your Career Potential
          </div>
          <div className="self-stretch text-center text-black text-2xl font-normal font-['Roboto'] leading-[27px]">
            Engage, Learn, and Grow with Guhuza
          </div>
        </div>
      </div>

      <div className="h-[423px] w-full justify-start items-start gap-8 inline-flex">
        <div className="w-[640px] self-stretch bg-[#0f4d83]/0 border border-[#0f4d83] justify-start items-start flex">
          <div className="grow shrink basis-0 self-stretch p-6 flex-col justify-center items-start gap-6 inline-flex">
            <div className="self-stretch h-[156px] flex-col justify-start items-start gap-3 flex">
              <div className="justify-start items-center inline-flex">
                <div className="text-black font-semibold font-['Roboto'] leading-normal text-xl">
                  <PiFeatherDuotone /> Features
                </div>
              </div>
              <div className="self-stretch h-[124px] flex-col justify-start items-start gap-3 flex">
                <div className="self-stretch text-black text-2xl font-bold font-['Roboto']">
                  Explore Our Exciting Platform Features
                </div>
                <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-4">
                  Quizzes tailored for your career advancement.
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
              <div className="flex justify-center items-center gap-2">
                <a
                  href="https://example.com/learnmore"
                  className="text-black text-base font-normal font-['Roboto'] leading-normal flex items-center"
                >
                  Learn More <MdOutlineKeyboardArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
          <div className="w-[344px] h-[421px] justify-center items-end inline-flex">
            <img
              className="self-stretch grow shrink basis-0"
              src="https://images.unsplash.com/photo-1612385763901-68857dd4c43c?q=80&w=3160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Feature illustration"
            />
          </div>
        </div>

        <div className="grow shrink basis-0 bg-[#0f4d83]/0 border border-black flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-[252px] p-6 flex-col justify-center items-start gap-6 flex">
            <div className="self-stretch h-[156px] flex-col justify-start items-start gap-2 flex">
              <div className="justify-start items-center inline-flex">
                <div className="text-black text-xl font-semibold font-['Roboto'] leading-normal">
                  <GrSend /> Share
                </div>
              </div>
              <div className="self-stretch h-[124px] flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch text-black text-2xl font-bold font-['Roboto'] leading-[33.60px]">
                  Competitive Leaderboards
                </div>
                <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
                  Compete and rise to the top with rewards.
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
              <div className="flex justify-center items-center gap-2">
                <a
                  href="https://example.com/join"
                  className="text-black text-base font-normal font-['Roboto'] leading-normal flex items-center"
                >
                  Join <MdOutlineKeyboardArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[171px] flex-col justify-end items-center flex">
            <img
              className="self-stretch h-[171px]"
              src="https://images.unsplash.com/flagged/photo-1578928534298-9747fc52ec97?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Leaderboard illustration"
            />
          </div>
        </div>

        <div className="grow shrink basis-0 bg-[#0f4d83]/0 border border-black flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-[252px] p-6 flex-col justify-center items-start gap-6 flex">
            <div className="self-stretch h-[156px] flex-col justify-start items-start gap-2 flex">
              <div className="justify-start items-center inline-flex">
                <div className="text-black text-xl font-semibold font-['Roboto'] leading-normal">
                  <PiPlugsConnectedBold /> Connect
                </div>
              </div>
              <div className="self-stretch h-[124px] flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch text-black text-2xl font-bold font-['Roboto'] leading-[33.60px]">
                  Engage with Community
                </div>
                <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
                  Join a vibrant community of professionals today.
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
              <div className="flex justify-center items-center gap-2">
                <a
                  href="https://example.com/signup"
                  className="text-black text-base font-normal font-['Roboto'] leading-normal flex items-center"
                >
                  Sign Up <MdOutlineKeyboardArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
          <div className="h-[171px] w-full">
            <img
              className="w-full h-full"
              src="https://images.unsplash.com/photo-1591197172062-c718f82aba20?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Community illustration"
            />
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
                  <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
                    Personalized AI quizzes for tailored career insights.
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch text-black text-5xl font-bold font-['Roboto'] leading-[57.60px]">Community</div>
                  <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
                    Connect with like-minded professionals and share achievements.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="h-[640px] border border-black border-opacity-30"
            src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Career potential illustration"
          />
        </div>
      </div>
  <div className="w-full min-h-screen px-16 py-28 bg-white flex-col justify-start items-center gap-20 inline-flex border border-black border-opacity-25">
  {/* Header Section */}
  <div className="flex flex-col justify-start items-center gap-4">
    <div className="flex justify-start items-center">
      <div className="text-center text-black text-base font-semibold font-['Roboto'] leading-normal">
        Engage
      </div>
    </div>
    <div className="flex flex-col justify-start items-center gap-6 w-full">
      <div className="text-center text-black text-5xl font-bold font-['Roboto'] leading-[57.60px] w-[800px]">
        Discover How Our Platform Transforms Networking
      </div>
      <div className="text-center text-black text-lg font-normal font-['Roboto'] leading-[27px] w-[700px]">
        Guhuza offers an innovative platform that enhances professional networking through interactive experiences. Our new web-based game is designed to engage users while providing valuable career insights.
      </div>
    </div>
  </div>

  {/* Steps Section */}
  <div className="flex flex-col justify-start items-start gap-16 w-full">
    <div className="flex justify-start items-start gap-20 w-full">
      {/* Step 1 */}
      <div className="flex flex-col justify-start items-center gap-6 flex-1">
        <div data-svg-wrapper className="relative">
          <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M42.127 14.24L41.847 13.74C41.4858 13.1354 40.9764 12.6329 40.367 12.28L26.947 4.54C26.3394 4.1875 25.6496 4.00124 24.947 4H24.367C23.6644 4.00124 22.9746 4.1875 22.367 4.54L8.94699 12.3C8.34093 12.6505 7.83751 13.1539 7.48699 13.76L7.20699 14.26C6.85449 14.8677 6.66823 15.5575 6.66699 16.26V31.76C6.66823 32.4626 6.85449 33.1524 7.20699 33.76L7.48699 34.26C7.84657 34.859 8.34797 35.3604 8.94699 35.72L22.387 43.46C22.9916 43.8198 23.6834 44.0066 24.387 44H24.947C25.6496 43.9988 26.3394 43.8126 26.947 43.46L40.367 35.7C40.979 35.3574 41.4844 34.852 41.827 34.24L42.127 33.74C42.4752 33.1306 42.6612 32.442 42.667 31.74V16.24C42.6658 15.5375 42.4796 14.8477 42.127 14.24ZM24.367 8H24.947L36.667 14.76L24.667 21.68L12.667 14.76L24.367 8ZM26.667 39L38.367 32.24L38.667 31.74V18.22L26.667 25.16V39Z" fill="black"/>
          </svg>
        </div>
        <div className="flex flex-col justify-start items-center gap-4">
          <div className="text-center text-black text-2xl font-bold font-['Roboto'] leading-[41.60px]">
            Step 1: Sign Up and Create Profile
          </div>
          <div className="text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Join our community by creating a personalized profile.
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col justify-start items-center gap-6 flex-1">
        <div data-svg-wrapper className="relative">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M41.46 14.24L41.18 13.74C40.8188 13.1354 40.3094 12.6329 39.7 12.28L26.28 4.54C25.6724 4.1875 24.9826 4.00124 24.28 4H23.7C22.9974 4.00124 22.3076 4.1875 21.7 4.54L8.28 12.3C7.67394 12.6505 7.17052 13.1539 6.82 13.76L6.54 14.26C6.1875 14.8677 6.00124 15.5575 6 16.26V31.76C6.00124 32.4626 6.1875 33.1524 6.54 33.76L6.82 34.26C7.17958 34.859 7.68098 35.3604 8.28 35.72L21.72 43.46C22.3246 43.8198 23.0164 44.0066 23.72 44H24.28C24.9826 43.9988 25.6724 43.8126 26.28 43.46L39.7 35.7C40.312 35.3574 40.8174 34.852 41.16 34.24L41.46 33.74C41.8082 33.1306 41.9942 32.442 42 31.74V16.24C41.9988 15.5375 41.8126 14.8477 41.46 14.24ZM23.7 8H24.28L36 14.76L24 21.68L12 14.76L23.7 8ZM26 39L37.7 32.24L38 31.74V18.22L26 25.16V39Z" fill="black"/>
          </svg>
        </div>
        <div className="flex flex-col justify-start items-center gap-6">
          <div className="text-center text-black text-2xl font-bold font-['Roboto'] leading-[41.60px]">
            Step 2: Take Job-Seeker Based Quizzes
          </div>
          <div className="text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Dive into our engaging game to enhance your skills.
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col justify-start items-center gap-6 flex-1">
        <div data-svg-wrapper className="relative">
          <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M41.794 14.24L41.514 13.74C41.1528 13.1354 40.6434 12.6329 40.034 12.28L26.614 4.54C26.0064 4.1875 25.3166 4.00124 24.614 4H24.034C23.3314 4.00124 22.6416 4.1875 22.034 4.54L8.61398 12.3C8.00792 12.6505 7.5045 13.1539 7.15398 13.76L6.87398 14.26C6.52148 14.8677 6.33522 15.5575 6.33398 16.26V31.76C6.33522 32.4626 6.52148 33.1524 6.87398 33.76L7.15398 34.26C7.51356 34.859 8.01496 35.3604 8.61398 35.72L22.054 43.46C22.6586 43.8198 23.3504 44.0066 24.054 44H24.614C25.3166 43.9988 26.0064 43.8126 26.614 43.46L40.034 35.7C40.646 35.3574 41.1514 34.852 41.494 34.24L41.794 33.74C42.1422 33.1306 42.3282 32.442 42.334 31.74V16.24C42.3328 15.5375 42.1466 14.8477 41.794 14.24ZM24.034 8H24.614L36.334 14.76L24.334 21.68L12.334 14.76L24.034 8ZM26.334 39L38.034 32.24L38.334 31.74V18.22L26.334 25.16V39Z" fill="black"/>
          </svg>
        </div>
        <div className="flex flex-col justify-start items-center gap-6 w-[480px] ">
          <div className="text-center text-black text-2xl font-bold font-['Roboto'] leading-[41.60px]">
            Step 3: Rank Up & Get Noticed by Employers
          </div>
          <div className="text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Climb the leaderboard by earning more GP and increase your visibility to potential employers.
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Call-to-Action Section */}
  <div className="flex justify-start items-center gap-6">
    <div className="px-6 py-3 bg-[#5692ca]/50 border-2 border-[#0f4d83] flex justify-center items-center gap-2">
      <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
        Start
      </div>
    </div>
    <div className="flex justify-center items-center gap-2">
      <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
        Learn More
      </div>
      <div data-svg-wrapper className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="#0F4D83"/>
        </svg>
      </div>
    </div>
  </div>
</div>
<div className="w-full h-[651px] px-16 py-20 bg-white flex flex-col justify-start items-start gap-20 ">
      <div className="self-stretch flex justify-start items-start gap-[120px]">
        <div className="flex-grow flex flex-col justify-start items-start gap-8">
          <div className="h-[194px] flex flex-col justify-start items-start gap-6">
            <h1 className="text-black text-5xl font-bold leading-[57.6px]">
              Join the Networking Revolution Today
            </h1>
            <p className="text-black text-lg font-normal leading-[27px]">
              Sign up now to unlock exciting features and start your journey in professional networking!
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-transparent border border-black text-black text-base font-normal leading-normal">
              Sign Up
            </button>
            <button className="px-6 py-3 border border-black text-black text-base font-normal leading-normal">
              Sign In
            </button>
          </div>
        </div>
        <div className="h-[185px] flex justify-start items-start gap-8 overflow-hidden">
          <div className="flex flex-col justify-start items-start">
            {[
              "About Us",
              "Careers",
              "Contact Us",
              "Privacy Policy",
              "Terms of Service",
            ].map((item, index) => (
              <div key={index} className="py-2">
                <p className="text-black text-sm font-semibold leading-[21px]">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-start items-start">
            {[
              "Blog",
              "Help Center",
              "Community",
              "Events",
              "Feedback",
            ].map((item, index) => (
              <div key={index} className="py-2">
                <p className="text-black text-sm font-semibold leading-[21px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="h-12 w-full justify-between items-center inline-flex  ">
      <div className="w-[300px] h-[150px] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${logo_b})` }}></div>

    <div className="justify-start items-center flex gap-7">
        <img className="w-30 h-20  border-2 border-white" src="https://guhuza.com/partners/TorontoJobs.ca.jpg" />
        <img className="w-30 h-10  border-2 border-white" src="https://guhuza.com/partners/monstor.jpg" />

    </div>
     </div>




    </div>
    </div>
  );
};

export default Home;
