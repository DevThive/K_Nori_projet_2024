import axios from 'axios';

async function noticeData() {
  try {
    const response = await axios.get('http://localhost:4001/notices');
    const data = response.data;

    // 데이터 가공
    const formattedData = data.map((item) => {
      const createdAtDate = new Date(item.createdAt);
      return {
        id: item.id,
        img: item.photo,
        img1: item.photo,
        img2: item.photo,
        date: createdAtDate.getDate(),
        month: createdAtDate.getMonth() + 1,
        year: createdAtDate.getFullYear(),
        postby: item.user,
        // comment: item.content,
        title: item.content_name,
        content: item.content,
        postby: 'Admin',
      };
    });
    // 가공된 데이터 반환
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    // 오류 처리
    return [
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
    ];
  }
}

export default noticeData;
