
const bcrypt =require('bcrypt'); 

const data = {
  users: [
    {
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'admin@example.com',
      password: bcrypt.hashSync('Test123@', 8),
      occupation:'',
      image: './image/pic-4.png',
      phoneNumber: "04567890662",
      role: "superadmin",
      seller:{
        brandName: "Biker",
        website: "http://yusuflateef.vercel.app",
      },
    },
    {
      firstName: 'Yusuf',
      lastName: 'Lateef',
      email: 'Yusuf@example.com',
      password: bcrypt.hashSync('Test123@', 8),
      image: './image/pic-3.png',
      phoneNumber: "04567890662",
      occupation:'Doctor',
    },
    {
      firstName: 'Emmanuel',
      lastName: "Beans",
      email: 'Emmanuel@example.com',
      password: bcrypt.hashSync('Test123@', 8),
      image: './image/pic-2.png',
      phoneNumber: "04567890662",
      occupation:'Doctor',
    },
    {
      firstName: "Boss",
      lastName: 'Man',
      email: 'Boss@example.com',
      password: bcrypt.hashSync('Test123@', 8),
      image: './image/pic-1.png',
      phoneNumber: "04567890662",
      occupation:'Programmer',
      role: "seller",
      seller:{
        brandName: "Biker",
        website: "http://yusuflateef.vercel.app",
      },
    },
  ],
  products: [
    {
      productName: "Bikere EA",
      productDesc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      price: 34,
      category: "trading bot",
      accountType: "Both Real & Demo",
      platform: "MT4"
    },
    {
      productName: "100% trader",
      productDesc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      price: 100,
      category: "indicator",
      accountType: "Only Real",
      platform: "MT4"
    },
    {
      productName: "A EA",
      productDesc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      price: 34,
      category: "trading bot",
      accountType: "Only Real",
      platform: "MT5"
    },
    {
      productName: "SS Indicator",
      productDesc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam incidunt quod praesentium iusto id autem possimus assumenda at ut saepe.',
      category: "indicator",
      accountType: "Only Demo",
      platform: "others"
    }
  ]
};

module.exports = data;