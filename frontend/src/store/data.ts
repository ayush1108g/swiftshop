import AyushBW from "./AyushPhoto-removebg-bw.png";
import Ayush from "./AyushPhoto-removebg-color.png";
import DivyaBW from "./Divya-removebg-bw.png";
import Divya from "./Divya-removebg-color.png";
import PushkarBW from "./Pushkar-removebg-bw.png";
import Pushkar from "./Pushkar-removebg-color.png";


interface Developer {
  linkedin: string;
  github: string;
  email: string;
  instagram: string;
  name: string;
  role: string;
  image: string;
  imageBW: string;
}

const data:Developer[] = [
  {
    linkedin: "https://www.linkedin.com/in/ayush-gupta-1020a9253/",
    github: "https://github.com/ayush1108g",
    email: "22EC01057@iitbbs.ac.in",
    instagram: "https://www.instagram.com/ayush__1108/",
    name: "Ayush Gupta",
    role: "Frontend Developer",
    image: Ayush,
    imageBW: AyushBW,
  },
  {
    linkedin: "https://www.linkedin.com/in/pushkar-gupta-153546208/",
    github: "https://github.com/22push",
    email: "22EE01018@iitbbs.ac.in",
    instagram: "https://www.instagram.com/pushkar_06_07/",
    name: "Pushkar Gupta",
    role: "Backend Developer",
    image: Pushkar,
    imageBW: PushkarBW,
  },
  {
    linkedin: "https://www.linkedin.com/in/divya-kumar-87a845265/",
    github: "https://github.com/Divyakumar6163",
    email: "22ME02040@iitbbs.ac.in",
    instagram: "https://www.instagram.com/divya_kumar_5161/",
    name: "Divya Kumar",
    role: "Frontend Developer",
    image: Divya,
    imageBW: DivyaBW,
  },
];
export default data;
