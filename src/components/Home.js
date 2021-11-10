const Home = ({ data }) => {
  return (
    <div>
      {data.offers.map((offers, index) => {
        console.log(offers);

        return <div key={index}>{offers.product_name}</div>;
      })}
    </div>
  );
};

export default Home;

<div></div>;
