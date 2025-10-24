import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 w-5 h-5" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
