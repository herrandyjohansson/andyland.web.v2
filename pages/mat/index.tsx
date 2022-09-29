import React from "react";
import ApiUtils from "../../utils/ApiUtils";
import NavbarIcon from "../../public/svg/aperture.svg";
import Image from "next/image";
import Link from "next/link";
import Recipes from "../../components/Recipes";
import { Form } from "react-bootstrap";

interface Recipe {
  name: string;
  uri: string;
}

/* Renderas två ggr på grund av reactStrictMode: true. Enbart för DEV miljön. */
const Food: React.FC = () => {
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const [isLoading, setLoading]: any = React.useState(false);
  const [status, setStatus]: any = React.useState<string | null>(null);
  const [fetchNewRecipe, setFetchNewRecipe]: any = React.useState(false);
  const [veganMode, setVeganMode] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [ownRecipeMode, setOwnRecipeMode] = React.useState(false);

  React.useEffect(() => {}, [ownRecipeMode]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = "";
      if (ownRecipeMode) {
        //let url = "https://localhost:7270/api/Scrape/getrecipe";
        url = "https://andyland-api.azurewebsites.net/api/Recipes/random";
      } else {
        url = "https://andyland-api.azurewebsites.net/api/Scrape/getrecipe";
      }

      if (veganMode) {
        url += "?veg=true";
      }

      const result = await fetch(url).catch((error) =>
        setStatus(error.message)
      );
      if (result) {
        const data = await result.json();
        // fetch new data if its the same as last time
        if (recipe?.name === data.name) {
          fetchData();
        }
        setRecipe(data);
        setStatus("success");
        setCount(count + 1);
      }
      setLoading(false);
    };

    if (fetchNewRecipe) {
      setRecipe(null);
      fetchData();
      setFetchNewRecipe(false);
    }
  }, [count, fetchNewRecipe, ownRecipeMode, recipe, veganMode]);

  return (
    <>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="recipe-generator">
            <div className="d-flex flex-column align-items-center line-height-2 pb-4">
              <div className="align-self-center pb-0 border-bottom">RECIPE</div>
              <div className="sofia ps-4 pe-4 rounded">GENERATOR</div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <span className="lead">Sofias recept</span>
              </div>
              <div className="col-6">
                <div className="d-flex justify-content-end display-4">
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      onClick={() => setOwnRecipeMode(!ownRecipeMode)}
                    />
                  </Form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <span className="lead">Vegetariskt</span>
              </div>
              <div className="col-6">
                <div className="d-flex justify-content-end display-4">
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch-veg"
                      onClick={() => setVeganMode(!veganMode)}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="text-danger">{status !== "success"}</div>
          <div className="pt-4 placeholder-glow">
            <button
              className={`display-4 col-12 text-uppercase btn-andyland ${
                isLoading && "placeholder"
              }`}
              onClick={() => setFetchNewRecipe(true)}
            >
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow spinner-grow-sm m-2"></div>
                  <div className="spinner-grow spinner-grow-sm m-2"></div>
                  <div className="spinner-grow spinner-grow-sm m-2"></div>
                </div>
              ) : (
                <div className="p-4">generate recipe</div>
              )}
            </button>

            <div className="card p-4 mt-4 display-4">
              <div className="card-body text-dark">
                <p className={`card-text ${isLoading && "placeholder-glow"}`}>
                  {recipe ? (
                    <Link href={recipe.uri}>
                      <a
                        className={`d-flex justify-content-center ${
                          isLoading && "placeholder"
                        }`}
                      >
                        {recipe?.name}
                      </a>
                    </Link>
                  ) : (
                    <div>
                      {count === 0 ? (
                        <div className="d-flex justify-content-center">
                          Prepare to be amazed!
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center placeholder"></div>
                      )}
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className=" text-warning display-4 pt-4 mt-4 d-flex justify-content-center">
              <span className="">Count | </span>
              <span className="text-white ms-2">{count}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Food;
