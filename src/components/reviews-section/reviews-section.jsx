import ArrowUpRight from '@/components/icons/arrow-up-right';
import { reviewsData } from '@/lib/data';

const ReviewCard = ({ review, upworkLink }) => {
  return (
    <figure className="review-card bg-white rounded-3xl">
      <svg
        className="review-card-mark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
      </svg>

      <blockquote className="review-card-text">{review}</blockquote>

      <figcaption className="review-card-footer">
        <a
          href={upworkLink}
          target="_blank"
          rel="noopener noreferrer"
          className="extlink review-card-link"
        >
          <ArrowUpRight />
          View on Upwork
        </a>
      </figcaption>
    </figure>
  );
};

const ReviewsSection = () => {
  return (
    <div className="section">
      <div className="container px-5">

        <div className="block-header">
          <h2 className="block-header-title">What people say</h2>
        </div>

        {/* Masonry layout using CSS columns */}
        <div className="reviews-masonry columns-1 md:columns-2 lg:columns-3 gap-6">
          {reviewsData.map((review) => (
            <ReviewCard
              key={review.id}
              review={review.review}
              upworkLink={review.upworkLink}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReviewsSection;
