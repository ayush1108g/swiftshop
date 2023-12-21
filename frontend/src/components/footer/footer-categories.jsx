import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";
import { useNavigate } from "react-router";
export default function A() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = e.target.getAttribute("name");
    navigate(`/page/?search=${name.split(" ").join('+')}&page=1&limit=20&sort=null`);
    window.scrollTo(0, 0);
  }
  return (
    <div className="footer-category">
      <div className="container">
        <h2 className="footer-category-title">Brand directory</h2>

        {/* Fashion Category */}
        <div className="footer-category-box">
          <h3 onClick={handleClick} className="category-box-title" name="fashion">Fashion :</h3>
          <li onClick={handleClick} className="footer-category-link" name="T-shirt">T-shirt &nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="Shirts">&nbsp; Shirts &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="ShortsJeans">&nbsp; shorts & jeans &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Jacket">&nbsp; jacket &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="DressFrock">&nbsp; dress & frock &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Innerwear">&nbsp; innerwear &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Hosiery">&nbsp; hosiery &nbsp;</li>
        </div>

        {/* Footwear Category */}
        <div className="footer-category-box">
          <h3 onClick={handleClick} className="category-box-title" name='footwear'>Footwear :</h3>
          <li onClick={handleClick} className="footer-category-link" name="Sport">&nbsp; sport &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Formal">&nbsp; formal &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Boots">&nbsp; Boots &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Casual">&nbsp; casual &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="CowboyShoes">&nbsp; cowboy shoes &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="SafetyShoes">&nbsp; safety shoes &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="PartyWearShoes">&nbsp; Party wear shoes &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Branded">&nbsp; Branded &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="FirstCopy">&nbsp; Firstcopy &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="LongShoes">&nbsp; Long shoes &nbsp;</li>
        </div>

        {/* Jewellery Category */}
        <div className="footer-category-box">
          <h3 onClick={handleClick} className="category-box-title" name="jewellery">Jewellery :</h3>
          <li onClick={handleClick} className="footer-category-link" name="Necklace">&nbsp; Necklace&nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Earrings">&nbsp; Earrings &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="CoupleRings">&nbsp; Couple rings &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Pendants">&nbsp; Pendants &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Crystal">&nbsp; Crystal &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Bangles">&nbsp; Bangles &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Bracelets">&nbsp; bracelets &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Nosepin">&nbsp; nosepin &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Chain">&nbsp; chain &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Earrings">&nbsp; Earrings &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="CoupleRings">&nbsp; Couple rings &nbsp;</li>
        </div>

        {/* Cosmetics Category */}
        <div className="footer-category-box">
          <h3 onClick={handleClick} className="category-box-title" name='cosmetics'>Cosmetics :</h3>
          <li onClick={handleClick} className="footer-category-link" name="Shampoo">&nbsp; Shampoo &nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="Bodywash">&nbsp; Bodywash&nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="Facewash">&nbsp; Facewash&nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="MakeupKit">&nbsp; makeup kit&nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="Liner">&nbsp; liner&nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="Lipstick">&nbsp; lipstick&nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="Perfume">&nbsp; perfume &nbsp;|</li>
          <li onClick={handleClick} className="footer-category-link" name="BodySoap">&nbsp; Body soap&nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Scrub">&nbsp; scrub&nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="HairGel">&nbsp; hair gel&nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="HairColors">&nbsp; hair colors&nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="HairDye">&nbsp; hair dye &nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="Sunscreen">&nbsp; sunscreen&nbsp; |</li>
          <li onClick={handleClick} className="footer-category-link" name="SkinLotion">&nbsp; skin lotion&nbsp; </li>
        </div>
      </div>
    </div>
  );
}

