const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left    */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4="
          alt="Phito"
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl md:text-2xl font-bold md:mb-2 mb-1 ">
          10 uses of Artificial Intelligence in Day to Day Life
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>Abdul Shafey</p>
          <div className="flex space-x-2 text-sm">
            <p>18/01/2024</p>
            <p>02:05</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          voluptatum fugit modi corrupti eveniet aspernatur distinctio eligendi
          et commodi non ipsam enim ducimus vel accusantium omnis mollitia, quis
          est temporibus, explicabo iusto reprehenderit? Necessitatibus, quam
          praesentium enim assumenda, nobis officia, esse laborum repudiandae
          minima eius sint consectetur soluta ducimus deserunt?
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
