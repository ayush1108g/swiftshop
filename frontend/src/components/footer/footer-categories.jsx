import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./footer.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function A() {

  const navigate = useNavigate();
  const color = useSelector((state) => state.themeMode.color);

  const handleClick = (e) => {
    const name = e.target.getAttribute("name");
    navigate(`/page/?search=${name.split(" ").join('+')}&page=1&limit=20&sort=null`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes["footer-category"]}>
      <div className="container">
        <h2 className={classes["footer-category-title"]} style={{ color: color.footerHeading }}>Brand directory</h2>

        <div className={classes["footer-category-box"]}>
          <h3 onClick={handleClick} className={classes["category-box-title"]} name="fashion" style={{ color: color.footerHeading }}>Fashion :</h3>
          <li onClick={handleClick} className={classes["footerLink"]} name="T-shirt" style={{ color: color.footerBody }}>T-shirt &nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Shirts" style={{ color: color.footerBody }}>&nbsp; Shirts &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="ShortsJeans" style={{ color: color.footerBody }}>&nbsp; shorts & jeans &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Jacket" style={{ color: color.footerBody }}>&nbsp; jacket &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="DressFrock" style={{ color: color.footerBody }}>&nbsp; dress & frock &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Innerwear" style={{ color: color.footerBody }}>&nbsp; innerwear &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Hosiery" style={{ color: color.footerBody }}>&nbsp; hosiery &nbsp;</li>
        </div>

        <div className={classes["footer-category-box"]}>
          <h3 onClick={handleClick} className={classes["category-box-title"]} name='footwear' style={{ color: color.footerHeading }}>Footwear :</h3>
          <li onClick={handleClick} className={classes["footerLink"]} name="Sport" style={{ color: color.footerBody }}>&nbsp; sport &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Formal" style={{ color: color.footerBody }}>&nbsp; formal &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Boots" style={{ color: color.footerBody }}>&nbsp; Boots &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Casual" style={{ color: color.footerBody }}>&nbsp; casual &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="CowboyShoes" style={{ color: color.footerBody }}>&nbsp; cowboy shoes &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="SafetyShoes" style={{ color: color.footerBody }}>&nbsp; safety shoes &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="PartyWearShoes" style={{ color: color.footerBody }}>&nbsp; Party wear shoes &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Branded" style={{ color: color.footerBody }}>&nbsp; Branded &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="FirstCopy" style={{ color: color.footerBody }}>&nbsp; Firstcopy &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="LongShoes" style={{ color: color.footerBody }}>&nbsp; Long shoes &nbsp;</li>
        </div>

        <div className={classes["footer-category-box"]}>
          <h3 onClick={handleClick} className={classes["category-box-title"]} name="jewellery" style={{ color: color.footerHeading }}>Jewellery :</h3>
          <li onClick={handleClick} className={classes["footerLink"]} name="Necklace" style={{ color: color.footerBody }}>&nbsp; Necklace&nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Earrings" style={{ color: color.footerBody }}>&nbsp; Earrings &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="CoupleRings" style={{ color: color.footerBody }}>&nbsp; Couple rings &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Pendants" style={{ color: color.footerBody }}>&nbsp; Pendants &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Crystal" style={{ color: color.footerBody }}>&nbsp; Crystal &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Bangles" style={{ color: color.footerBody }}>&nbsp; Bangles &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Bracelets" style={{ color: color.footerBody }}>&nbsp; bracelets &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Nosepin" style={{ color: color.footerBody }}>&nbsp; nosepin &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Chain" style={{ color: color.footerBody }}>&nbsp; chain &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Earrings" style={{ color: color.footerBody }}>&nbsp; Earrings &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="CoupleRings" style={{ color: color.footerBody }}>&nbsp; Couple rings &nbsp;</li>
        </div>

        <div className={classes["footer-category-box"]}>
          <h3 onClick={handleClick} className={classes["category-box-title"]} style={{ color: color.footerHeading }} name='cosmetics'>Cosmetics :</h3>
          <li onClick={handleClick} className={classes["footerLink"]} name="Shampoo" style={{ color: color.footerBody }}>&nbsp; Shampoo &nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Bodywash" style={{ color: color.footerBody }}>&nbsp; Bodywash&nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Facewash" style={{ color: color.footerBody }}>&nbsp; Facewash&nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="MakeupKit" style={{ color: color.footerBody }}>&nbsp; makeup kit&nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Liner" style={{ color: color.footerBody }}>&nbsp; liner&nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Lipstick" style={{ color: color.footerBody }}>&nbsp; lipstick&nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Perfume" style={{ color: color.footerBody }}>&nbsp; perfume &nbsp;|</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="BodySoap" style={{ color: color.footerBody }}>&nbsp; Body soap&nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Scrub" style={{ color: color.footerBody }}>&nbsp; scrub&nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="HairGel" style={{ color: color.footerBody }}>&nbsp; hair gel&nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="HairColors" style={{ color: color.footerBody }}>&nbsp; hair colors&nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="HairDye" style={{ color: color.footerBody }}>&nbsp; hair dye &nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="Sunscreen" style={{ color: color.footerBody }}>&nbsp; sunscreen&nbsp; |</li>
          <li onClick={handleClick} className={classes["footerLink"]} name="SkinLotion" style={{ color: color.footerBody }}>&nbsp; skin lotion&nbsp; </li>
        </div>
      </div>
    </div>
  );
}
