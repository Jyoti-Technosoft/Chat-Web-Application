import "./ErrorPage.scss";

function ErrorPage() {
  return (
    <>
      <div className="conatiner text-center error-page-div vw-100 vh-100">
        <img
          className="error-page-img vw-50"
          src="src/assets/images/jisunpark_404-error.gif"
          alt="Error Img"
        />
      </div>
    </>
  );
}

export default ErrorPage;
