export interface Image {
  full: string;
  thumbnail: string;
}

const makeImagesWithTrivialThumbnail = (
  imageCount: number,
  nickName: string
): Image[] =>
  Array.from(
    { length: imageCount },
    (_, i) => `./images/image-${nickName}-${i + 1}.png`
  ).map(full => ({ full, thumbnail: full }));

const makeImagesWithThumbnail = (
  imageCount: number,
  nickName: string
): Image[] =>
  Array.from({ length: imageCount }, (_, i) => ({
    full: `./images/image-${nickName}-${i + 1}.jpg`,
    thumbnail: `./images/image-${nickName}-${i + 1}-thumbnail.jpg`,
  }));

export interface Product {
  id: number;
  nickname: string;
  name: string;
  company: string;
  description: string;
  price: number;
  discount: number;
  readonly finalPrice: number;
  images: Image[];
}

export const products = new Map<number, Product>();

function addProduct({
  nickname,
  name,
  company,
  description,
  price,
  discount,
  images,
}: Omit<Product, "id" | "finalPrice">) {
  const id = products.size + 1;
  products.set(id, {
    id,
    nickname,
    name,
    company,
    description,
    price,
    discount,
    get finalPrice() {
      return price * (1 - discount);
    },
    images,
  });
}

addProduct({
  nickname: "sneaker",
  name: "Fall Limited Edition Sneakers",
  company: "Sneaker Company",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 250.0,
  discount: 0.5,
  images: makeImagesWithThumbnail(4, "sneaker"),
});
addProduct({
  nickname: "car",
  name: "Concept Sports Car",
  company: "Future Motors",
  description:
    "A glimpse into the future of autonomous and electric driving. Sleek, fast, and intelligent.",
  price: 180000.0,
  discount: 0.1,
  images: makeImagesWithTrivialThumbnail(4, "car"),
});
addProduct({
  nickname: "bag",
  name: "Urban Explorer Bag",
  company: "Modern Carry",
  description:
    "The perfect companion for your daily commute or weekend adventures. Stylish and functional.",
  price: 120.0,
  discount: 0.0,
  images: makeImagesWithTrivialThumbnail(4, "bag"),
});
addProduct({
  nickname: "backpack",
  name: "Tech-Ready Backpack",
  company: "Gadget Gear",
  description:
    "Carry all your tech in one place. Padded compartments for laptops, tablets, and more.",
  price: 95.0,
  discount: 0.15,
  images: makeImagesWithTrivialThumbnail(4, "backpack"),
});
