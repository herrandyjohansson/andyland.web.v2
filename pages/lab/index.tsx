import React from "react";
import Image from "next/image";

const Lab: React.FC<any> = () => {
  return (
    <>
      <div className="container mt-4">
        {/* Left newsfeed */}
        <div className="row">
          <div className="col-12 col-lg-3 bg-warning lab-card d-flex flex-column">
            <article>
              <div>
                <Image src={"/assets/img/skate.png"} width={500} height={500} />
              </div>
              <div>
                <span className="h2">Welcome, old friend.</span>
                <div className="card-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus quae id cupiditate praesentium sed ea, quaerat ?
                </div>
              </div>
              <div className="text-uppercase btn btn-light w-100">
                <span className="m-2">see more</span>
              </div>
            </article>
          </div>
          <div className="col-12 col-lg bg-danger card">
            <article>
              <div className="d-flex justify-content-center">
                <Image src={"/assets/img/skate.png"} width={500} height={500} />
              </div>
              <div className="p-2">
                <span className="h2">Welcome, old friend.</span>
                <span className="card-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus quae id cupiditate praesentium sed ea, quaerat
                    tempore quod ullam modi sapiente debitis laudantium
                    asperiores explicabo velit similique voluptatibus ratione
                    delectus?
                  </p>
                </span>
              </div>
            </article>
          </div>
          {/* Right newsfeed */}
          <div className="col-12 col-lg-3 bg-info card">
            <article>
              <div className="d-flex justify-content-center">
                <Image src={"/assets/img/skate.png"} width={500} height={500} />
              </div>
              <div className="p-2">
                <span className="h2">Welcome, old friend.</span>
                <span className="card-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus quae id cupiditate praesentium sed ea, quaerat
                    tempore quod ullam modi sapiente debitis laudantium
                    asperiores explicabo velit similique voluptatibus ratione
                    delectus?
                  </p>
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lab;
