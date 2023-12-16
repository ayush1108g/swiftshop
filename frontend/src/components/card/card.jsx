// import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
export default function () {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-body">
          <img
            src="https://m.media-amazon.com/images/I/410yXpanMoL._SX300_SY300_QL70_FMwebp_.jpg"
            alt=""
          />
          <span>
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example dnjkfdfsk
            </p>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
          </span>
        </div>
        <span>
          <strong>
            <h5>&#8377;10000</h5>
          </strong>
          <p>
            <s>&#8377;15000</s> <span className="discount">31% off</span>
          </p>
        </span>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
}
