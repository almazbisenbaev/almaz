import { ChevronRight } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: "",
    review: "Almaz did an excellent job developing my WordPress portfolio website. He handled the theme change and improvements with great skill and attention to detail. Communication was smooth, and he always kept me updated on progress. The site now looks more professional and works perfectly. I truly appreciate his hard work and would be happy to work with him again on future projects.",
    upworkLink: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
  },
  {
    id: 2,
    name: "",
    review: "Almaz did an exceptional work and he was very helpful. The job was time consuming but Almaz be able to navigate through and finish the job. He completed everything I requested. he is very patient and willing to listen. He even offered me a free no charge update if I needed one. Almaz is very professional and I highly recommended him for this type of job.",
    upworkLink: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
  },
  {
    id: 3,
    name: "", 
    review: "Almaz is very knowledgeable person, he know exactly what he is doing. He has vey deep knowledge of the job. This is a second time dealing with him, both times he delivered the job well.",
    upworkLink: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
  },
  {
    id: 4,
    name: "",
    review: "Almaz was so helpful in setting up my website! He completed everything that I needed but faster than I had expected and the finished results exceeded my expectations. I will definitely be using his work in the future for any additional projects. He was so communicative and even made me a guide on maintaining what he had completed to make sure I was able to utilize all of the things he set in place. Overall I highly recommend Almaz and I am so glad I found him!",
    upworkLink: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
  },
  {
    id: 5,
    name: "",
    review: "Amazing, quality work, Almaz is smart, fast has great UX skills and is also business oriented so he will make sure to get you the results for your business!",
    upworkLink: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
  },
  {
    id: 6,
    name: "",
    review: "Almaz was great at setting up our website and very responsive with communications. Highly recommend if you need Wordpress assistance.",
    upworkLink: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
  },
];

const ReviewCard = ({ review, name, upworkLink }) => {
  return (
    <div className="review-card bg-white rounded-3xl p-8">
      <div className="mb-5 review-card-quote">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#efd8d8" class="bi bi-quote" viewBox="0 0 16 16"> <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"></path></svg>
        <p className="text-gray-800 text-lg">{review}</p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
        </div>
        <a 
          href={upworkLink}
          target="_blank"
          rel="noopener noreferrer"
          className="extlink"
        >
          View on Upwork
          <ChevronRight size={14} />
        </a>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <div className="section">
      <div className="container mx-auto px-6">
        
        <div className="section-header">
          <h2 className="section-header-title">What people say</h2>
        </div>

        {/* Masonry layout using CSS columns */}
        <div className="reviews-masonry columns-1 md:columns-2 lg:columns-3 gap-6">
          {reviewsData.map((review) => (
            <ReviewCard
              key={review.id}
              review={review.review}
              name={review.name}
              upworkLink={review.upworkLink}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReviewsSection;