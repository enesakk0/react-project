import PropTypes from "prop-types";

const ImageList = ({ image, stateHandle }) => {
  const handleClickEvent = (id) => {
    const filtered = image.filter((item) => item.key !== id);
    stateHandle(filtered);
  };
  return (
    <>
      {image.length > 0
        ? image.map((item) => {
            return (
              <div
                key={item.key}
                className="bg-gray-100 p-5 rounded-md w-[95%] flex gap-3 self-center mb-2"
              >
                <img src={item.url} width={60} height={60} />
                <article className="flex flex-col gap-1">
                  <p>{item.name}</p>
                  <div className="flex gap-1">
                    <p className="text-gray-400 text-sm">{item.size}</p>
                    <img src="../tik.png" width={20} height={20} />
                    <p className="text-sm">Completed</p>
                    <img
                      src="../trash.png"
                      width={20}
                      height={20}
                      onClick={() => handleClickEvent(item.key)}
                    />
                  </div>
                </article>
              </div>
            );
          })
        : null}
    </>
  );
};

ImageList.propTypes = {
  image: PropTypes.array,
  stateHandle: PropTypes.func,
};

export default ImageList;
