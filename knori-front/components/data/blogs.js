// import axios from 'axios';

// const blogs = async () => {
//   try {
//     const response = await axios.get('http://localhost:4001/notices');
//     const data = response.data;

//     // 데이터 가공
//     const formattedData = data.map((item) => ({
//       id: item.id,
//       img: item.photo,
//       img1: item.photo,
//       img2: item.photo,
//       date: item.createdAt.getDate(),
//       month: item.createdAt.getMonth() + 1,
//       year: item.createdAt.getFullYear(),
//       postby: item.user,
//       comment: item.content,
//       title: item.content_name,
//     }));
//     console.log(formattedData);
//     // 가공된 데이터 반환
//     return formattedData;
//   } catch (error) {
//     console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
//     // 오류 처리
//     return null;
//   }
// };

// export default blogs;

// axios
//   .get('http://localhost:4001/notices')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

const blogs = [
  {
    id: '1',
    img: '/img/blog/blog-1.jpg',
    img1: '/img/blog/blog-11.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '21',
    month: 'Jul',
    year: '2023',
    postby: 'Admin',
    comment: '3',
    title: 'Find cheap hotels in the best locations',
  },
  {
    id: '2',
    img: '/img/blog/blog-2.jpg',
    img1: '/img/blog/blog-11.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '25',
    month: 'Aug',
    year: '2023',
    postby: 'Admin',
    comment: '5',
    title: 'Book a room Today most Affordable Rates.',
  },
  {
    id: '3',
    img: '/img/blog/blog-3.jpg',
    img1: '/img/blog/blog-11.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '29',
    month: 'Sep',
    year: '2023',
    postby: 'Admin',
    comment: '3',
    title: 'Our expertise covers all Aspects of the industry',
  },
  {
    id: '4',
    img: '/img/blog/blog-13.jpg',
    img1: '/img/blog/blog-11.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '27',
    month: 'Mar',
    year: '2023',
    postby: 'Admin',
    comment: '3',
    title: 'Sheraton Broadway Plantation Resort Villas',
  },
  {
    id: '5',
    img: '/img/blog/blog-14.jpg',
    img1: '/img/blog/blog-11.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '27',
    month: 'Apr',
    year: '2023',
    postby: 'Admin',
    comment: '3',
    title: 'Find cheap hotels in the best locations',
  },
  {
    id: '6',
    img: '/img/blog/blog-15.jpg',
    img1: '/img/blog/blog-11.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '27',
    month: 'Nov',
    year: '2023',
    postby: 'Admin',
    comment: '3',
    title: 'Book a room Today most Affordable Rates.',
  },
  {
    id: '7',
    img: '/img/hotel/hotel-1.jpg',
    img1: '/img/hotel/hotel-2.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '18',
    month: 'Aug',
    year: '2023',
    postby: 'Admin',
    comment: '5',
    title: 'Welcome Our Hotels And Resorts',
  },
  {
    id: '8',
    img: '/img/features/feature-1.jpg',
    img1: '/img/hotel/hotel-2.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '11',
    month: 'Sep',
    year: '2023',
    postby: 'Admin',
    comment: '8',
    title:
      'Proin massa augue, lacinia at blandit ac, fringilla scelerisque tortor. Mauris sit amet lectus porta,',
  },
  {
    id: '9',
    img: '/img/features/feature-2.jpg',
    img1: '/img/hotel/hotel-2.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '12',
    month: 'Dec',
    year: '2023',
    postby: 'Admin',
    comment: '6',
    title: 'The Library',
  },
  {
    id: '10',
    img: '/img/features/feature-3.jpg',
    img1: '/img/hotel/hotel-2.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '13',
    month: 'Sep',
    year: '2023',
    postby: 'Admin',
    comment: '3',
    title: 'Exercise equipment',
  },
  {
    id: '11',
    img: '/img/features/feature-4.jpg',
    img1: '/img/hotel/hotel-2.jpg',
    img2: '/img/blog/blog-12.jpg',
    date: '19',
    month: 'Jul',
    year: '2023',
    postby: 'Admin',
    comment: '9',
    title: 'Swimming Pool',
  },
];

export default blogs;
