import "./track.css";
export default function Track() {
  return (
    <div className="track">
      <p>Order ID:1234455</p>
      <hr />
      <div className="track-content">
        <div className="track__container">
          <h1>Track your order</h1>
          <p>Detail</p>
          <p>Detail2</p>
          <p>&#8377;5666</p>
        </div>
        <div className="track__container__form">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1828/1828884.svg"
            alt="No img found"
            loading="lazy"
          />
        </div>
      </div>
      <hr />
      <span className="track-status">
        <input type="radio" />
        <label> &nbsp;Order Confirmed</label>
        <br />
        <br />
        <input type="radio" />
        <label> &nbsp;Delivered</label>
        <br />
        <button>See All Updates &gt;</button>
      </span>
      <hr />
      <button id="Help">Need Help?</button>
    </div>
  );
}
