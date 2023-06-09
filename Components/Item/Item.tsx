type ItemType = {
  name: string;
  description: string;
  dateAcquired: string;
  idx: number;
};

const Item = ({ name, description, dateAcquired, idx }: ItemType) => (
  <div className="w-full h-fit p-4 rounded-2xl bg-gray-800">
    <h3 className="text-lg text-gray-200">
      <span className="font-medium">Item Number: </span>
      {idx}
    </h3>

    <div className="flex flex-col gap-2 p-4">
      <p className="text-gray-400">
        <span className="font-semibold">Name: </span>
        {name}
      </p>

      <p className="text-gray-400">
        <span className="font-semibold">Description: </span>
        {description}
      </p>

      <p className="text-gray-400">
        <span className="font-semibold">Date: </span>
        {new Date(dateAcquired).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default Item;
